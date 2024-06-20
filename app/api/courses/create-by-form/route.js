import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

import Course from "@/models/courseModel";

import { createOneByForm } from "@/utils/factoryHandler";

export const POST = routeHandler(
  async function (req, { params }) {
    const appError = await createOneByForm(Course, false)(req, { params });
    if (appError) return appError;

    const course = req.data.course;

    // If image was provided, upload to s3
    const imageFile = req.data.formData.image;
    if (imageFile) {
      const appError = await course.uploadImageToS3(imageFile);
      if (appError) return appError;
    }

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
