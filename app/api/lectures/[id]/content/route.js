import { promises as fs } from "fs";

import Content from "@/models/contentModel";
import Subscription from "@/models/subscriptionModel";
import Lecture from "@/models/lectureModel";
import Course from "@/models/courseModel";

import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";

import { NextResponse } from "next/server";
import path from "path";

export const GET = routeHandler(
  async function (req, { params }) {
    const { user } = req.data;
    if (!user)
      return new AppError("Login session is invalid, please login again", 400);

    await connectDB();

    // Check if user has a premium subscription if not admin
    if (user.role !== "admin") {
      const subscription = await Subscription.findOne({
        user: user._id,
        startsAt: { $lt: new Date(Date.now()) },
        endsAt: { $gt: new Date(Date.now()) },
      }).select({ _id: 1 });
      if (!subscription)
        return new AppError("Buy premium to gain access to this lecture", 401);
    }

    // Find lecture
    const lecture = await Lecture.findById(params.id).select({
      type: 1,
      chapter: 1,
      slug: 1,
    });
    if (!lecture) return new AppError("Lecture does not exist", 404);

    // Find content associated with lecture
    const content = await Content.findOne({ lecture: params.id }).select({
      _id: 1,
    });
    if (!content)
      return new AppError(
        "This lecture currently does not have any content",
        404
      );

    const course = await Course.findOne({ chapters: lecture.chapter }).select({
      slug: 1,
    });
    if (!course)
      return new AppError(
        "Could not find the course associated with this lecture",
        404
      );

    let contents;
    try {
      const directory = path.join(
        process.cwd(),
        `app/data/contents/${course.slug}/${lecture.slug}.json`
      );
      contents = await fs.readFile(directory, "utf8");
      contents = JSON.parse(contents);
    } catch (err) {
      console.error("CONTENT READFILE ERROR: ", err);
      return new AppError(
        "Something went wrong when reading lecture's contents",
        400
      );
    }

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
