import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

import Course from "@/models/courseModel";

import { createOneByForm } from "@/utils/factoryHandler";

export const POST = routeHandler(
  async function (req, { params }) {
    await createOneByForm(Course, false)(req, { params });
    const { course } = req.data;

    // If image was provided, upload to s3
    await course.uploadImageToS3(req.data.formData.image);

    return NextResponse.json(
      {
        status: "success",
        data: {
          course,
        },
      },
      { status: 201 }
    );
  },
  {
    parseForm: true,
    requiresSession: true,
    restrictTo: ["admin"],
  }
);
