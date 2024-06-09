import mongoose from "mongoose";
import subjects from "@/data/subjects.json";
import slugify from "slugify";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Name is taken, choose another one"],
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [100, "Name cannot exceed 100 characters"],
    required: [true, "Please provide a valid name"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a valid subject"],
    enum: {
      values: Object.keys(subjects),
      message: "Subject is not valid",
    },
  },
  summary: {
    type: String,
    trim: true,
    minLength: [20, "Summary must be at least 20 characters long"],
    maxLength: [200, "Summary cannot exceed 200 characters"],
    required: [true, "Please provide a proper summary"],
  },
  description: {
    type: String,
    trim: true,
    minLength: [200, "Description must be at least 200 characters long"],
    maxLength: [1000, "Description cannot exceed 1000 characters"],
    required: [true, "Please provide a proper description"],
  },
  image: {
    type: String,
    minLength: [3, "Image source must be at least 3 characters long"],
    maxLength: [500, "Image source cannot exceed 500 characters"],
    default: "default.png",
  },
  chapters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Chapter",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    immutable: [true, "Cannot change when course was created"],
  },
  slug: String,
  isArchived: { type: Boolean, default: false },
  comingSoon: { type: Boolean, default: false },
  chaptersCount: {
    type: Number,
    default: 0,
    min: [0, "Chapters count cannot be less than 0"],
  },
  lecturesCount: {
    type: Number,
    default: 0,
    min: [0, "Lectures count cannot be less than 0"],
  },
});

// Create a new slug every time name is modified
courseSchema.pre("save", function (next) {
  if (this.isNew) {
    this.slug = slugify(this.name);
  }

  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
