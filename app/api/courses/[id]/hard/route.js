import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import AppError from "@/utils/AppError";
import S3Object from "@/utils/S3Object";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";

// Deletes course and all of its chapters and lectures
export const DELETE = routeHandler(
  async function (req, { params }) {
    await connectDB();

    // Check if course exists
    const course = await Course.findById(params.id);
    if (!course)
      return new AppError("No course found with the provided id", 404);

    const { chapters } = course;

    // Delete course's lectures (Query is ok in this case)
    await Lecture.deleteMany({ chapter: { $in: chapters } });
    // NOTE: We will not delete lecture's content so that we can keep track of it

    // Delete course's chapters (Query is ok in this case)
    await Chapter.deleteMany({ _id: { $in: chapters } });

    // Delete course's image from storage
    if (course.image) {
      await S3Object.deleteS3Object(course.getImageKey());
    }

    // Delete course
    await course.deleteOne();

    return new Response(null, { status: 204 });
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
  }
);
