import { doesObjectIdExist } from "@/utils/database";
import mongoose from "mongoose";
import Lecture from "./lectureModel";

const contentSchema = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Content must be attached to a lecture"],
    unique: [true, "You can only have one content per lecture"],
  },
  url: {
    type: String,
    default: "none",
  },
});

contentSchema.path("lecture").validate(doesObjectIdExist(Lecture), "Lecture does not exist");

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
