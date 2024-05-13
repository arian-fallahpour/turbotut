import Chapter from "@/models/chapterModel";
import Lecture from "@/models/lectureModel";
import catchAsync from "@/utils/catchAsync";
import { connectDB } from "@/utils/database";

// Deletes chapter and all of its lectures
export const DELETE = catchAsync(async function (req, { params }) {
  await connectDB();

  // Check if chapter exists
  const chapter = await Chapter.findById(params.id);
  if (!chapter)
    return new AppError("No chapter found with the provided id", 404);

  // Delete chapter's lectures (Query is ok in this case)
  await Lecture.deleteMany({ chapter: chapter.id });

  // Delete chapter
  await chapter.deleteOne();
});
