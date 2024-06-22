import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

// PREVENTS ERROR
import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";

export const GET = routeHandler(
  async function (req, { params }) {
    if (!params.slug)
      return new AppError("Please provide the slug of a course", 400);

    await connectDB();

    // Find course and all of its unarchived chapters/lectures
    const course = await Course.findOne({ slug: params.slug }).populate({
      path: "chapters",
      select: { name: 1, lectures: 1 },
      match: { isArchived: false },
      populate: {
        path: "lectures",
        select: { name: 1, slug: 1, type: 1 },
        match: { isArchived: false },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        data: { course },
      },
      { status: 200 }
    );
  },
  { parseBody: true }
);
