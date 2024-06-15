import mongoose from "mongoose";
import Course from "./courseModel";
import { doesObjectIdExist } from "@/utils/database";

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [100, "Name cannot exceed 100 characters"],
      required: [true, "Please provide a valid name"],
    },
    course: {
      required: [true, "Chapter must belong to a course"],
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
    lectures: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Lecture",
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
      immutable: [true, "Cannot change when chapter was created"],
    },
    isArchived: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chapterSchema.virtual("lecturesCount").get(function () {
  return this.lectures.length;
});

chapterSchema
  .path("course")
  .validate(doesObjectIdExist(Course), "Course does not exist");

// Prevent duplicate values for index/name in each course
chapterSchema.index({ course: 1, name: 1 }, { unique: true });

chapterSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

// Adds chapter to course
chapterSchema.post("save", { document: true }, async function (doc, next) {
  // Check if document was just created
  if (!doc.wasNew) return;

  // Check if course exists
  const course = await Course.findById(doc.course);
  if (!course) return next();

  // Add chapter to course
  course.chapters.push(doc._id);
  await course.save();

  next();
});

const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
