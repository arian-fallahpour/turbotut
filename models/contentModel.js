import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Content must be attached to a lecture"],
    unique: [true, "You can only have one content per lecture"],
  },
  url: {
    type: String,
    required: [true, "Content requires the url of the file"],
  },
});

const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
