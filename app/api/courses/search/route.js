import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

export const GET = routeHandler(
  async function (req, { params }) {
    const lectures = await Chapter.find();

    for (let i = 0; i < lectures.length; i++) {
      await lectures[i].save();
    }

    return NextResponse.json(
      {
        lectures,
      },
      { status: 200 }
    );
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
  }
);
