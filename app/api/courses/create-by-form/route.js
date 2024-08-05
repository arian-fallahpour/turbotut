import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

import Course from "@/models/courseModel";

import { createOneByForm } from "@/utils/factoryHandler";
import { fetchAuth, getDomain } from "@/utils/dataFetch";

export const POST = routeHandler(
  async function (req, { params }) {
    await createOneByForm(Course, false)(req, { params });
    const { course } = req.data;

    // If image was provided, upload to s3
    try {
      const imageFile = req.data.formData.image;
      if (imageFile) await course.uploadImageToS3(imageFile);
    } catch (appError) {
      await fetchAuth(`${getDomain()}/api/courses/${course._id}/hard`, { method: "DELETE" });
      throw appError;
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
