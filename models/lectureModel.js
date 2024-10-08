import mongoose from "mongoose";
import Chapter from "./chapterModel";
import slugify from "slugify";
import Course from "./courseModel";
import AppError from "@/utils/AppError";
import { doesObjectIdExist } from "@/utils/database";
import enumValues from "@/app/data/enum-values";
import mongooseFuzzySearching from "mongoose-fuzzy-searching";
import validator from "validator";

const lectureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [100, "Name cannot exceed 100 characters"],
    required: [true, "Please provide a valid name"],
  },
  chapter: {
    required: [true, "Lecture must belong to a chapter"],
    type: mongoose.Schema.ObjectId,
    ref: "Chapter",
  },
  type: {
    type: String,
    enum: {
      values: enumValues.lecture.type,
      message: "Lecture type must either be free or paid",
    },
    default: "paid",
  },
  isArchived: { type: Boolean, default: false },
  slug: {
    type: String,
    validate: {
      validator: validator.isSlug,
      message: "Please provide a valid slug",
    },
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    immutable: [true, "Cannot change when lecture was created"],
  },
});

lectureSchema.path("chapter").validate(doesObjectIdExist(Chapter), "Chapter does not exist");

// Prevent duplicate values for index/name in each chapter
lectureSchema.index({ chapter: 1, name: 1 }, { unique: true });
lectureSchema.plugin(mongooseFuzzySearching, {
  fields: [{ name: "name", minSize: 3, prefixOnly: true }],
});

lectureSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

// Create slug
lectureSchema.pre("save", async function (next) {
  if (this.isNew && !this.slug) {
    const chapter = await Chapter.findById(this.chapter).select({ course: 1, name: 1 });
    const course = await Course.findById(chapter.course).select({ name: 1 });

    this.slug = slugify(`${course.name} ${chapter.name} ${this.name}`);
  }

  next();
});

// Adds lecture to chapter when created and updates course's lectureCount
lectureSchema.post("save", { document: true }, async function (doc, next) {
  // Check if document was just created
  if (!doc.wasNew) return;

  // Check if chapter exists
  const chapter = await Chapter.findById(doc.chapter);
  if (!chapter) return next(new AppError("Chapter was not found", 404));

  // Add lecture to chapter
  chapter.lectures.push(doc._id);
  chapter.lecturesCount += 1;
  await chapter.save();

  // Find course
  const course = await Course.findById(chapter.course);
  if (!course) return next(new AppError("Course was not found", 404));

  // Update course's lecturesCount
  course.lecturesCount += 1;
  await course.save();

  next();
});

const Lecture = mongoose.models.Lecture || mongoose.model("Lecture", lectureSchema);

export default Lecture;
