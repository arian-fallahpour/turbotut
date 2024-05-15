import mongoose from "mongoose";

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

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
