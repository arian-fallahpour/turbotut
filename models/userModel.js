import { connectDB } from "@/utils/database";
import { toCap } from "@/utils/helper";
import mongoose from "mongoose";
import validator from "validator";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userSchema = new mongoose.Schema(
  {
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
    isBanned: {
      type: Boolean,
      default: false,
      select: false,
    },
    lastLoggedIn: Date,
    // kickedOffAt: Date, //TODO: use this instead of lastLoggedIn to avoid confusion?
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("fullName").get(function () {
  return this.firstName && this.lastName && `${this.firstName} ${this.lastName}`;
});

userSchema.statics.signupUpdateUser = async ({ firstName, lastName, email, picture }) => {
  await connectDB();

  let user = await User.findOne({ email }).select("+isBanned");
  const lastLoggedIn = Date.now() - 2000;

  // If user exists, update current one
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.picture = picture;
    user.lastLoggedIn = lastLoggedIn;
    await user.save();
  }

  // If user does not exist, create a new one
  else {
    user = await User.create({
      firstName,
      lastName,
      email,
      picture,
      lastLoggedIn: lastLoggedIn,
    });
  }

  return user;
};

userSchema.methods.hasLoggedInAfterTokenIssued = function (tokenIssuedAt) {
  if (this.lastLoggedIn) {
    return this.lastLoggedIn.getTime() > tokenIssuedAt;
  }

  return false;
};

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
