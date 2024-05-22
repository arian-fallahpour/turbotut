import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";

export const DELETE = routeHandler(
  async function (req, { params }) {
    await connectDB();

    // Check if lecture exists
    const lecture = await Lecture.findById(params.id);
    if (!lecture)
      return new AppError("No lecture found with the provided id", 404);

    // Update chapter
    const chapter = await Chapter.findOne({ lectures: lecture._id });
    chapter.lectures.pull(lecture._id);

    // Update course
    const course = await Course.findById(chapter.course);
    course.lecturesCount -= 1;
    await course.save();

    // Delete chapter
    await lecture.deleteOne();

    return new Response(null, { status: 204 });
  },
  { requiresSession: true, restrictTo: ["admin"] }
);
