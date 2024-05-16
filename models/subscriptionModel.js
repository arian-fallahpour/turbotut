import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
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
});

subscriptionSchema.statics.findActive = async function (userId) {
  return await mongoose.model("Subscription").findOne({
    user: userId,
    startsAt: { $lt: new Date(Date.now()) },
    endsAt: { $gt: new Date(Date.now()) },
  });
};

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
