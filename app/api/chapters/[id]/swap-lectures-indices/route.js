import Chapter from "@/models/chapterModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const PATCH = routeHandler(
  async function changeIndices(req, { params }) {
    await connectDB();

    console.log(req.data.body);

    if (!req.data.body || !req.data.body.swaps) return new AppError("Please provide index swaps", 400);

    // Find course
    const chapter = await Chapter.findById(params.id);
    if (!chapter) return new AppError("Could not find chapter", 404);

    // Make changes and save
    req.data.body.swaps.forEach(([i, j]) => {
      if (i >= 0 && j >= 0 && i < chapter.lectures.length && j < chapter.lectures.length) {
        const b = chapter.lectures[j];
        chapter.lectures[j] = chapter.lectures[i];
        chapter.lectures[i] = b;
      }
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
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
    parseBody: true,
  }
);
