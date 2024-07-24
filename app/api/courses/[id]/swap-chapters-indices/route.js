import Course from "@/models/courseModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const PATCH = routeHandler(
  async function changeIndices(req, { params }) {
    await connectDB();

    if (!req.data.body || !req.data.body.swaps) return new AppError("Please provide index swaps", 400);

    // Find course
    const course = await Course.findById(params.id);
    if (!course) return new AppError("Could not find course", 404);

    // Make changes and save
    req.data.body.swaps.forEach(([i, j]) => {
      if (i >= 0 && j >= 0 && i < course.chapters.length && j < course.chapters.length) {
        const b = course.chapters[j];
        course.chapters[j] = course.chapters[i];
        course.chapters[i] = b;
      }
    });
    await course.save();

    // Return course
    return NextResponse.json(
      {
        status: "success",
        data: { course },
      },
      { status: 200 }
    );
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
    parseBody: true,
  }
);
