import mongoose from "mongoose";
import slugify from "slugify";
import S3Object from "@/utils/S3Object";
import AppError from "@/utils/AppError";
import sharp from "sharp";
import enumValues from "@/data/enum-values";
import mongooseFuzzySearching from "mongoose-fuzzy-searching";

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
      values: enumValues.course.subject,
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
  lecturesCount: {
    type: Number,
    default: 0,
    min: [0, "Lectures count cannot be less than 0"],
  },
  chaptersCount: {
    type: Number,
    default: 0,
    min: [0, "Lectures count cannot be less than 0"],
  },
});

courseSchema.plugin(mongooseFuzzySearching, {
  fields: [{ name: "name", minSize: 3, prefixOnly: true }],
});

// Create a new slug every time name is modified
courseSchema.pre("save", function (next) {
  if (this.isNew) {
    this.slug = slugify(this.name);
  }

  next();
});

courseSchema.methods.getImageKey = function () {
  return this.image.split("amazonaws.com/")[1];
};

courseSchema.methods.uploadImageToS3 = async function (imageFile) {
  // Check if image does not exceed 2MB
  const maxFileSize = 1024 * 1024 * 2; // 2Mb
  if (imageFile.size > maxFileSize) {
    return new AppError("Image cannot be larger than 2MB", 400);
  }

  // Check if image type is valid
  const acceptedFileTypes = [ "image/jpeg", "image/jpg", "image/png", "image/webp" ]; //prettier-ignore
  if (!acceptedFileTypes.includes(imageFile.type)) {
    return new AppError("You must upload an image", 400);
  }

  // Edit photo to fit sizes
  const imageBuffer = await imageFile.arrayBuffer();
  const formattedBuffer = await sharp(imageBuffer)
    .resize(1500, 1500)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toBuffer();

  // Create signed url to upload file
  const imageS3Object = new S3Object(
    formattedBuffer,
    "image/webp",
    Buffer.byteLength(formattedBuffer)
  );

  // If image does not exist, create key
  console.log("!this.image: ", !this.image);
  let key;
  if (!this.image) {
    const filename = imageS3Object.getUniqueFilename(this.slug);
    const fileExtension = imageS3Object.getFileExtension();
    console.log(filename, fileExtension);
    key = `courses/images/${filename}.${fileExtension}`;
  }

  // If image exists, use existing key
  else {
    console.log(this);
    key = this.getImageKey();
  }

  console.log(key);

  // Create signed url
  const metadata = { course: JSON.stringify(this._id) };
  const signedURL = await imageS3Object.getSignedURL({ key, metadata });

  // Upload file to S3 bucket and check if there was an error
  const appError = await imageS3Object.upload(signedURL);
  if (appError) {
    return appError;
  }

  // Get access url and add it to course
  const accessURL = imageS3Object.getAccessURL(signedURL);
  this.image = accessURL;
  await this.save();
};

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
