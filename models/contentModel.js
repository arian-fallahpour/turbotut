import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Content must be attached to a lecture"],
  },
  src: {
    type: String,
    required: [true, "Content requires a src"],
    maxLength: [3000, "Content src cannot be longer than 2000 characters"],
  },
});

const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
