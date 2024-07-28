import User from "@/models/userModel";
import AppError from "@/utils/AppError";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const PATCH = routeHandler(
  async function (req, { params }) {
    if (!params.id) return new AppError(`Please provide the id of the user to kick off`, 400);

    await connectDB();

    // Find user
    const user = await User.findById(params.id);
    if (!user) return new AppError("No user found", 404);

    // Kick user off
    await user.kickOff();

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: `User ${user._id} (${user.email}) kicked off.`,
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
