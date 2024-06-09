import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";

// Deletes chapter and all of its lectures
export const DELETE = routeHandler(
  async function (req, { params }) {
    await connectDB();

    // Check if chapter exists
    const chapter = await Chapter.findById(params.id);
    if (!chapter)
      return new AppError("No chapter found with the provided id", 404);

    // Delete chapter's lectures (Query is ok in this case)
    await Lecture.deleteMany({ chapter: chapter.id });
    // NOTE: We will not delete lecture's content so that we can keep track of it

    // Update course
    const course = await Course.findOne({ chapters: chapter._id });
    course.chaptersCount -= 1;
    course.chapters.pull(chapter._id);
    await course.save();

    // Delete chapter
    await chapter.deleteOne();

    return new Response(null, { status: 204 });
  },
  { requiresSession: true, restrictTo: ["admin"] }
);
