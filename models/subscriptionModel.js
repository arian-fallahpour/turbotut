import mongoose from "mongoose";
import User from "./userModel";
import Order from "./orderModel";
import { doesObjectIdExist } from "@/utils/database";

const subscriptionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: {
      values: ["active", "passed", "cancelled"],
      message: "Status must be either active, passed or cancelled",
    },
    default: "active",
    required: [true, "Subscription must have a status"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Subscription must be associated with a user"],
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: [true, "Subscription must be associated with an order"],
    immutable: [true, "The associated order cannot be modified"],
  },
  startsAt: {
    type: Date,
    required: [true, "Please specify a start date"],
  },
  endsAt: {
    type: Date,
    required: [true, "Please specify an end date"],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    immutable: [true, "The creation date of this order cannot be changed"],
  },
  stripeSubscriptionId: {
    type: String,
    required: [true, "Please provide a stripe subscription id"],
  },
  cancelsAtPeriodEnd: {
    type: Boolean,
    default: false,
    required: [true, "You must specify if this subscription will cancel at the end of its period or not"],
  },
});

subscriptionSchema.path("user").validate(doesObjectIdExist(User), "User does not exist");
subscriptionSchema.path("order").validate(doesObjectIdExist(Order), "Order does not exist");

subscriptionSchema.statics.findActive = async function (userId, options) {
  return await mongoose.model("Subscription").findOne(
    {
      user: userId,
      status: "active",
    },
    options
  );
};

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
