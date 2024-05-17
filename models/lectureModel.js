import mongoose from "mongoose";
import Chapter from "./chapterModel";
import slugify from "slugify";
import Course from "./courseModel";

const lectureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [100, "Name cannot exceed 100 characters"],
    required: [true, "Please provide a valid name"],
  },
  chapter: {
    required: [true, "Lecture must belong to a chapter"],
    type: mongoose.Schema.ObjectId,
    ref: "Chapter",
  },
  course: {
    required: [true, "Lecture must belong to a course"],
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  type: {
    type: String,
    enum: {
      values: ["free", "paid"],
      message: "Lecture type must either be free or paid",
    },
    default: "paid",
  },
  isArchived: { type: Boolean, default: false },
  slug: String,
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    immutable: [true, "Cannot change when lecture was created"],
  },
});

// Prevent duplicate values for index/name in each chapter
lectureSchema.index({ chapter: 1, name: 1 }, { unique: true });

lectureSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

// Create slug
lectureSchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("name")) {
    const chapter = await Chapter.findById(this.chapter);
    if (!chapter) return next();

    this.slug = slugify(`${chapter.name} ${this.name}`);
  }

  next();
});

// Adds lecture to chapter when created and updates course's lectureCount
lectureSchema.post("save", { document: true }, async function (doc, next) {
  console.log("Adding lecture to chapter");

  // Check if document was just created
  if (!doc.wasNew) return;

  // Check if chapter exists
  const chapter = await Chapter.findById(doc.chapter).select({
    lectures: 1,
    course: 1,
  });
  if (!chapter) return next(new AppError("Chapter was not found", 404));

  // Add lecture to chapter
  chapter.lectures.push(doc._id);
  await chapter.save();

  // Find course
  const course = await Course.findById(doc.course).select({ lecturesCount: 1 });
  if (!course) return next();

  // Update course's lecture
  course.lecturesCount += 1;
  await course.save();

  next();
});

// Removes lecture from its chapter
lectureSchema.post("deleteOne", { document: true }, async function (doc, next) {
  console.log("Remove lecture from its chapter");

  // Find chapter
  const chapter = await Chapter.findById(doc.chapter);
  if (!chapter) return next();

  // Remove lecture from chapter
  const index = chapter.lectures.findIndex((lctr) => lctr._id === doc._id);
  chapter.lectures.splice(index, 1);

  // Save chapter
  await chapter.save();

  // Find course
  const course = await Course.findById(doc.course).select({ lecturesCount: 1 });
  if (!course) return next();

  // Update course's lecture
  course.lecturesCount -= 1;
  await course.save();

  next();
});

const Lecture =
  mongoose.models.Lecture || mongoose.model("Lecture", lectureSchema);

export default Lecture;
