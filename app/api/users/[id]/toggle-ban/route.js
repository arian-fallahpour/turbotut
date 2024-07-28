import User from "@/models/userModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const PATCH = routeHandler(
  async function (req, { params }) {
    if (!params.id) return new AppError(`Please provide the id of the user to ban`, 400);

    await connectDB();

    // Find user
    const user = await User.findById(params.id).select("+isBanned");
    if (!user) return new AppError("No user found", 404);

    console.log(user);

    // Ban user
    user.isBanned = !user.isBanned;
    await user.save();

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: `User ${user._id} (${user.email}) ${user.isBanned ? "banned" : "unbanned"}.`,
        data: { user },
      },
      { status: 200 }
    );
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
  }
);
