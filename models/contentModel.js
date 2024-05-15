import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Content must be attached to a lecture"],
  },
  filename: {
    type: String,
    required: [true, "Content requires the filename of the file"],
    maxLength: [250, "Content filename cannot be longer than 250 characters"],
  },
});

const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
