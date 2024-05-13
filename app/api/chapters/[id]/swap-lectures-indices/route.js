import Chapter from "@/models/chapterModel";
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
  const chapter = await Chapter.findById(params.id);
  if (!chapter) return new AppError("Could not find chapter", 404);

  // Make changes and save
  body.swaps.forEach(([i, j]) => {
    const b = chapter.lectures[j];
    chapter.lectures[j] = chapter.lectures[i];
    chapter.lectures[i] = b;
  });
  await chapter.save();

  // Return chapter
  return NextResponse.json(
    {
      status: "success",
      data: {
        chapter,
      },
    },
    { status: 200 }
  );
});
