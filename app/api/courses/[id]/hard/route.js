import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import AppError from "@/utils/AppError";
import catchAsync from "@/utils/catchAsync";
import { connectDB } from "@/utils/database";

// Deletes course and all of its chapters and lectures
export const DELETE = catchAsync(async function (req, { params }) {
  await connectDB();

  // Check if course exists
  const course = await Course.findById(params.id);
  if (!course) return new AppError("No course found with the provided id", 404);

  const { chapters } = course;

  // Delete course's lectures (Query is ok in this case)
  await Lecture.deleteMany({ chapter: { $in: chapters } });

  // Delete course's chapters (Query is ok in this case)
  await Chapter.deleteMany({ _id: { $in: chapters } });

  // Delete course
  await course.deleteOne();
});
