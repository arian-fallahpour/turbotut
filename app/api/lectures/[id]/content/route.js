import fsp from "fs/promises";
import Content from "@/models/contentModel";
import AppError from "@/utils/AppError";
import { NextResponse } from "next/server";
import { routeHandler } from "@/utils/authentication";
import Lecture from "@/models/lectureModel";
import Course from "@/models/courseModel";
import Subscription from "@/models/subscriptionModel";
import { connectDB } from "@/utils/database";

export const GET = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;
    if (!user)
      return new AppError("Login session invalid, please login again", 400);

    await connectDB();

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
    }).select({ _id: 1 });
    if (!subscription)
      return new AppError("Buy premium to gain access to this lecture", 401);

    // Find content associated with lecture
    const content = await Content.findOne({ lecture: params.id });
    if (!content)
      return new AppError(
        "This lecture currently does not have any content",
        404
      );

    // Find course
    const course = await Course.findById(lecture.course).select({
      _id: 1,
      name: 1,
    });

    // Fetch local content file
    const fileBuffer = await fsp.readFile(
      process.cwd() +
        `/data/lectures/contents/${course.name}/${content.filename}`,
      "utf8"
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
