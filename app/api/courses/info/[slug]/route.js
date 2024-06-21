import Course from "@/models/courseModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

export const GET = routeHandler(
  async function (req, { params }) {
    console.log(req.data);
    if (!params.slug)
      return new AppError("Please provide the slug of a course", 400);

    const course = await Course.findOne({ slug: params.slug }).populate({
      path: "chapters",
      select: { name: 1, lectures: 1 },
      populate: {
        path: "lectures",
        select: { name: 1, slug: 1, type: 1 },
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
