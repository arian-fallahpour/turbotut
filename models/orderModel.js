import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Specify an order type"],
    enum: {
      values: ["purchase", "subscription"],
      message: "Order type must either be purchase or subscription",
    },
  },
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

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
