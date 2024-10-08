import Chapter from "@/models/chapterModel";
import Content from "@/models/contentModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";

export const DELETE = routeHandler(
  async function (req, { params }) {
    await connectDB();

    // Check if lecture exists
    const lecture = await Lecture.findById(params.id);
    if (!lecture) return new AppError("No lecture found with the provided id", 404);

    // Update chapter
    const chapter = await Chapter.findOne({ lectures: lecture._id });
    chapter.lectures.pull(lecture._id);
    chapter.lecturesCount -= 1;
    await chapter.save();

    // Update course
    const course = await Course.findById(chapter.course);
    course.lecturesCount -= 1;
    await course.save();

    // Set lecture's content's isLectureDeleted status to true
    const content = await Content.findOne({ lecture: lecture._id });
    content.isLectureDeleted = true;
    await content.save();

    // Delete lecture
    await lecture.deleteOne();

    return new Response(null, { status: 204 });
  },
  { requiresSession: true, restrictTo: ["admin"] }
);

// NOTE: We will not delete lecture's content so that we can keep track of it
