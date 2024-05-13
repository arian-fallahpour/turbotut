import { getServerSession } from "next-auth";
import catchAsync from "./catchAsync";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";
import AppError from "./AppError";
import User from "@/models/userModel";
import { connectDB } from "./database";
import { redirect } from "next/navigation";

export const routeHandler = (fn, options = {}) =>
  catchAsync(async (...args) => {
    options = {
      requiresSession: options.requiresSession || false,
      restrictTo: options.restrictTo || null,
    };

    const session = await getServerSession(authOptions);

    // Protect route from requests without a session
    let user;
    if (options.requiresSession || options.restrictTo) {
      await connectDB();

      // Check if a session, and a user on that session exists
      if (!session || !session.user)
        return new AppError("Please login to perform this action", 401);

      // Check if user exists
      user = await User.findById(session.user._id);
      if (!user)
        return new AppError(
          "Login session is invalid, please login again",
          404
        );
    }

    // Protect from users without specific roles
    if (options.restrictTo && !options.restrictTo.includes(user.role)) {
      return new AppError("You do not have access to this action", 401);
    }

    // add user to a data object in request
    args[0].data = { user };

    // Continue with function if authorized
    return fn(...args);
  });

export const requiresSession = (session) => {
  if (!session || !session.user) {
    redirect("/?login=true");
  }
};

export const restrictTo = (session, roles) => {
  if (!session || !session.user || !roles.includes(session.user.role)) {
    redirect("/?login=true");
  }
};
