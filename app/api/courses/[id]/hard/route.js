import Chapter from "@/models/chapterModel";
import Content from "@/models/contentModel";
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
    if (!course) return new AppError("No course found with the provided id", 404);

    // Get lecture ids
    let lectures = await Lecture.find({ chapter: { $in: course.chapters } }).select("_id");
    lectures = lectures.map((obj) => obj._id);

    // Set all the content's isLectureDeleted status to true
    const contents = await Content.find({ lecture: { $in: lectures } });
    for (let i = 0; i < contents.length; i++) {
      contents[i].isLectureDeleted = true;
      await contents[i].save();
    }

    // Delete course's lectures (Query is ok in this case)
    await Lecture.deleteMany({ _id: { $in: lectures } });

    // Delete course's chapters (Query is ok in this case)
    await Chapter.deleteMany({ _id: { $in: course.chapters } });

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
