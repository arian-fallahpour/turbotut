import { redirect } from "next/navigation";

import catchAsync from "./catchAsync";
import AppError from "./AppError";
import { connectDB } from "./database";

import User from "@/models/userModel";

import { getServerSession } from "next-auth";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";
import { sanitizeFilter } from "mongoose";
import { rateLimit } from "./security";

export const routeHandler = (fn, options = {}) =>
  catchAsync(async (...args) => {
    options = {
      requiresSession: options.requiresSession || false,
      restrictTo: options.restrictTo || null,
    };

    const [req, { params, query }] = args;
    args[0].data = {};

    // SECURITY HTTP HEADERS
    console.log(query);

    // DATA SANITATION: NoSQL query injection
    const body = await req.json().catch((err) => null);
    args[0].data.body = sanitizeFilter(body);
    args[1].params = sanitizeFilter(params);
    // TODO: Add sanitation for query when used

    // DATA SANITATION: XSS protection

    // RATE LIMITING
    const rateLimitError = rateLimit(req);
    if (rateLimitError) return rateLimitError;

    // Retrieve session
    const session = await getServerSession(authOptions);

    // AUTH: Session requirement
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

    // AUTH: Role restriction
    if (options.restrictTo && !options.restrictTo.includes(user.role)) {
      return new AppError("You do not have access to this action", 401);
    }

    // add user to a data object in request
    args[0].data.user = user;

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

// TODO
/**
 * Security features that need to be added
 * - Rate limiting
 *
 *
 * Security testing procedure
 * - Test protected and restricted endpoints
 *
 *
 *
 */
