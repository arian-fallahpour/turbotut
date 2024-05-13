import fsp from "fs/promises";
import Content from "@/models/contentModel";
import AppError from "@/utils/AppError";
import { NextResponse } from "next/server";
import { routeHandler } from "@/utils/authentication";
import Lecture from "@/models/lectureModel";
import Purchase from "@/models/purchaseModel";
import Course from "@/models/courseModel";
import Subscription from "@/models/subscriptionModel";

export const GET = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;
    if (!user)
      return new AppError("Login session invalid, please login again", 400);

    // Find lecture
    const lecture = await Lecture.findById(params.id).select({
      type: 1,
      course: 1,
    });
    if (!lecture) return new AppError("Lecture does not exist", 404);

    // Check if user has a premium subscription
    const subscription = await Subscription.findOne({
      user: user._id,
      startsAt: { $lt: new Date(Date.now()) },
      endsAt: { $gt: new Date(Date.now()) },
    });

    // If lecture is paid and user is not premium, check if user owns the course
    if (lecture.type === "paid" && !subscription) {
      const course = await Course.findById(lecture.course).select({ _id: 1 });
      const purchase = await Purchase.findOne({
        user: user._id,
        course: course._id,
      });

      // If user did not make a purchase with this course, they cannot access content
      if (!purchase)
        return new AppError(
          "Buy premium, or buy this course to gain access to this lecture",
          401
        );
    }

    // Find content associated with lecture
    const content = await Content.findOne({ lecture: params.id });
    if (!content)
      return new AppError(
        "This lecture currently does not have any content",
        404
      );

    // TODO: Fetch content file from S3 or local diskeqsw
    const fileBuffer = await fsp.readFile(
      process.cwd() + "/public/contents-test/" + content.src
    );
    const contents = JSON.parse(fileBuffer);

    // Send response
    return NextResponse.json({
      status: "success",
      data: {
        lecture,
        contents,
      },
    });
  },
  { requiresSession: true }
);
