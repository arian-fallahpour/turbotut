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

    await connectDB();

    // Find lecture
    const lecture = await Lecture.findById(params.id).select({ type: 1, chapter: 1, slug: 1 });
    if (!lecture) return new AppError("Lecture does not exist", 404);

    // Check if lecture is archived
    if (lecture.isArchived) return new AppError("Lecture no longer exists", 400);

    // If lecture is of type paid, user must exist
    if (lecture.type === "paid" && !user) return new AppError("Buy premium to gain access to this lecture", 400);

    // If lecture is paid and user is not admin, user must have a subscription to access it
    if (lecture.type === "paid" && user.role !== "admin") {
      const subscription = await Subscription.findActive(user._id, { select: { id: 1 } });

      if (!subscription) return new AppError("Buy premium to gain access to this lecture", 401);
    }

    // Find content associated with lecture
    const content = await Content.findOne({ lecture: params.id }).select({ _id: 1 });
    if (!content) return new AppError("This lecture currently does not have any content", 404);

    // Find course associated with lecture
    const course = await Course.findOne({ chapters: lecture.chapter }).select({ slug: 1 });
    if (!course) return new AppError("Could not find the course associated with this lecture", 404);

    let contents;
    try {
      const directory = path.join(process.cwd(), `app/data/contents/${course.slug}/${lecture.slug}.json`);

      contents = await fs.readFile(directory, "utf8");
      contents = JSON.parse(contents);
    } catch (err) {
      console.error("CONTENT READFILE ERROR: ", err);
      return new AppError("This lecture currently does not have any content", 400);
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
  { getSession: true }
);
