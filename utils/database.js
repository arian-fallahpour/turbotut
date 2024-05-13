import mongoose from "mongoose";
import catchAsync from "./catchAsync";
import User from "@/models/userModel";

export const connectDB = async () => {
  let isConnected = false;

  if (isConnected) {
    if (process.env.NODE_ENV === "development") {
      console.log("<< Database already connected >>");
    }

    return;
  }

  try {
    const uri = process.env.DB_CONNECT.replace(
      "<password>",
      process.env.DB_PASS
    );
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    isConnected = true;
    console.log("<< Database connected >>");
  } catch (err) {
    console.log(err);
  }
};

export const signupUpdateUser = catchAsync(
  async ({ firstName, lastName, email, picture }) => {
    await connectDB();

    let user = await User.findOne({ email });

    // If user exists, update current one
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.picture = picture;
      await user.save();
    }

    // If user does not exist, create a new one
    else {
      user = await User.create({
        firstName,
        lastName,
        email,
        picture,
      });
    }

    return user;
  }
);

export const isValidObjectId = (Model) =>
  async function (val) {
    const doc = await Model.findById(val).select({ id: 1 });
    return !!doc; // Converts to truth value
  };
