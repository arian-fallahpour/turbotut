import mongoose from "mongoose";
import User from "./userModel";
import { doesObjectIdExist } from "@/utils/database";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Provide a user for this order"],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    immutable: [true, "The creation date of this order cannot be changed"],
  },
});

orderSchema
  .path("user")
  .validate(doesObjectIdExist(User), "User does not exist");

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
