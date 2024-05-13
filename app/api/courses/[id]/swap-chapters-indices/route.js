import Course from "@/models/courseModel";
import AppError from "@/utils/AppError";
import catchAsync from "@/utils/catchAsync";
import { connectDB } from "@/utils/database";
import { getBody } from "@/utils/helper";
import { NextResponse } from "next/server";

export const PATCH = catchAsync(async function changeIndices(req, { params }) {
  await connectDB();

  const body = await getBody(req);
  if (!body || !body.swaps)
    return new AppError("Please provide index swaps", 400);

  // Find course
  const course = await Course.findById(params.id);
  if (!course) return new AppError("Could not find course", 404);

  // Make changes and save
  body.swaps.forEach(([i, j]) => {
    const b = course.chapters[j];
    course.chapters[j] = course.chapters[i];
    course.chapters[i] = b;
  });
  await course.save();

  // Return course
  return NextResponse.json(
    {
      status: "success",
      data: {
        course,
      },
    },
    { status: 200 }
  );
});
