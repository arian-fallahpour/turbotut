import { toCap } from "@/utils/helper";
import mongoose from "mongoose";
import validator from "validator";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please provide your first name"],
    minLength: [3, "First name must be greater or equal to 3 characters"],
    maxLength: [100, "First name cannot surpass 100 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please provide your last name"],
    minLength: [3, "Last name must be greater or equal to 3 characters"],
    maxLength: [100, "Last name cannot surpass 100 characters"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please provide your email"],
    minLength: [3, "Email must be greater or equal to 3 characters"],
    maxLength: [300, "Email cannot surpass 300 characters"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],
      message: "Please provide a valid role",
    },
  },
  picture: String,
  stripeCustomerId: String,
});

// Create stripe customer
userSchema.pre("save", async function (next) {
  if (this.isNew || !this.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: this.email,
      name: `${toCap(this.firstName)} ${toCap(this.lastName)}`,
    });

    this.stripeCustomerId = customer.id;
  }

  next();
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
