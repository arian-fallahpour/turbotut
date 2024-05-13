import mongoose from "mongoose";
import subjects from "@/data/subjects.json";
import slugify from "slugify";
import { capitalize } from "@/utils/helper";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
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
  chaptersCount: { type: Number, default: 0 },
  lecturesCount: { type: Number, default: 0 },
  stripeProductId: String,
});

courseSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.name;
  }

  next();
});

// Creat a new slug every time name is modified
courseSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name);
  }

  next();
});

// Create a stripeProduct when a new course is created
courseSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  // TODO: Fix image, only works for localhost
  // Create stripe product
  const imagePath = `/images/courses/${this.image}`;
  const product = await stripe.products.create({
    name: capitalize(this.name),
    description: this.summary,
    default_price_data: {
      currency: "USD",
      unit_amount: 999,
    },
    images: [
      `http://localhost:3000/_next/image?url=${encodeURIComponent(
        imagePath
      )}&w=1080&q=75`,
    ],
    metadata: {
      courseId: this._id.toString(),
    },
  });

  // Store product id on document
  this.stripeProductId = product.id;

  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
