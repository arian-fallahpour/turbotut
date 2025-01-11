import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";

import { NextResponse } from "next/server";
import { editOneByForm } from "@/utils/factoryHandler";
import { fetchAuth, getDomain } from "@/utils/dataFetch";
import AppError from "@/utils/AppError";

export const PATCH = routeHandler(
  async function (req, { params }) {
    const appError = await editOneByForm(Course, false)(req, { params });
    if (appError) return appError;

    const { course } = req.data;

    // If image was provided, upload replacement to s3
    try {
      const imageFile = req.data.formData.image;
      if (typeof imageFile !== "undefined" && imageFile.size > 0) {
        await course.uploadImageToS3(imageFile);
      }
    } catch (appError) {
      return new AppError(appError.message, appError.code);
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
