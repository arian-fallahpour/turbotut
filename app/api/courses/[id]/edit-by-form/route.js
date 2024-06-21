import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";

import { NextResponse } from "next/server";
import { editOneByForm } from "@/utils/factoryHandler";

export const PATCH = routeHandler(
  async function (req, { params }) {
    const appError = await editOneByForm(Course, false)(req, { params });
    if (appError) return appError;

    const { course } = req.data;

    // If image was provided, upload replacement image
    const imageFile = req.data.formData.image;
    if (imageFile && imageFile.size > 0) {
      const appError = await course.uploadImageToS3(imageFile);
      if (appError) return appError;
    }

    // Send response
    return NextResponse.json({
      status: "success",
      data: {
        course,
      },
    });
  },
  {
    parseForm: true,
    requiresSession: true,
    restrictTo: ["admin"],
  }
);
