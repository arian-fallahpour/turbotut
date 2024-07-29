import { redirect } from "next/navigation";

import catchAsync from "./catchAsync";
import AppError from "./AppError";
import { connectDB } from "./database";

import User from "@/models/userModel";

import { getServerSession } from "next-auth";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";
import { sanitizeFilter } from "mongoose";
import { rateLimit } from "./security";
import { setDefault } from "./helper";
import queryString from "query-string";

const whitelistedQueryFields = ["populate"];

export const routeHandler = (fn, options = {}) =>
  catchAsync(async (...args) => {
    options = {
      getSession: setDefault(options.getSession, false),
      requiresSession: setDefault(options.requiresSession, false),
      restrictTo: setDefault(options.restrictTo, null),
      parseBody: setDefault(options.parseBody, false),
      parseForm: setDefault(options.parseForm, false),
    };

    const [req, { params }] = args;
    args[0].data = {};

    // PARAMETER POLLUTION PROTECTION
    args[0].data.query = sanitizeParameters(queryString.parse(req.url.split("?")[1]));

    // DATA SANITATION: NoSQL query injection for body
    if (options.parseBody) {
      const body = await req.json().catch((err) => null);
      args[0].data.body = sanitizeFilter(body);
    }

    // DATA SANITATION: NoSQL query injection for formData
    if (options.parseForm) {
      const formData = await req.formData();
      const formDataObject = {};
      formData.forEach((value, key) => (formDataObject[key] = value));
      args[0].data.formData = sanitizeFilter(formDataObject);
    }

    // RATE LIMITING
    const rateLimitError = rateLimit(req);
    if (rateLimitError) return rateLimitError;

    // Get session if needed, but it is not required as of now
    if (!options.getSession && !options.requiresSession && !options.restrictTo) return fn(...args);

    // Retrieve session
    const session = await getServerSession(authOptions);
    args[0].data.session = session;

    // Fetch user if needed
    await connectDB();
    const user = await User.findById(session?.user?._id).select("+isBanned");
    args[0].data.user = user;

    // AUTH: Session required
    if (!options.requiresSession && !options.restrictTo) return fn(...args);

    // Check if a session, and a user on that session exists
    if (!session || !session.user) return new AppError("Please login to perform this action", 401);

    // Check if user exists
    if (!user) return new AppError("Login session is invalid, please login again", 404);

    // Check if user is banned
    if (user.isBanned) return new AppError("You have been banned", 401);

    // Check if user has been kicked off
    const hasBeenKickedOff = user.hasBeenKickedAfterTokenIssued(session.tokenIssuedAt);
    if (hasBeenKickedOff) return new AppError("You have been kicked off your account, please login again", 401);

    // Check if user is logged in
    if (!user.lastLoggedIn) return new AppError("Please login again", 401);

    // Check if user logged in after current token was issued
    const loggedInAfterTokenIssued = user.hasLoggedInAfterTokenIssued(session.tokenIssuedAt);
    if (loggedInAfterTokenIssued) return new AppError("Please login again", 401);

    // AUTH: Role restriction
    if (!options.restrictTo) return fn(...args);

    // Check if user has the appropriate role
    if (!options.restrictTo.includes(user.role)) return new AppError("You do not have access to this action", 401);

    return fn(...args);
  });

export const requiresSession = async (session) => {
  if (!session || !session.user) {
    redirect("/");
  }

  await connectDB();
  const user = await User.findById(session.user._id).select("role isBanned lastLoggedIn kickedOffAt");

  if (
    user.isBanned || // Check if user is banned
    user.hasBeenKickedAfterTokenIssued(session.tokenIssuedAt) || // Check if user has been kicked off
    !user.lastLoggedIn || // Check if user was kicked off session or not logged in
    user.hasLoggedInAfterTokenIssued(session.tokenIssuedAt) // Check if user logged in after current token was issued
  ) {
    redirect("/force-logout");
  }

  return user;
};

export const restrictTo = (user, roles) => {
  if (!user || !roles.includes(user.role)) {
    redirect("/");
  }
};

function sanitizeParameters(query) {
  const sanitized = {};

  Object.keys(query).forEach((key) => {
    if (Array.isArray(query[key]) && !whitelistedQueryFields.includes(key)) {
      sanitized[key] = query[key][0];
      ListedRateLimitPaths = ["/dashboard"];
    } else {
      sanitized[key] = query[key];
    }
  });

  return sanitizeFilter(sanitized);
}
