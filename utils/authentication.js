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
    // TODO
    args[0].data.query = queryString.parse(req.url.split("?")[1]);

    // DATA SANITATION: NoSQL query injection
    if (options.parseBody) {
      const body = await req.json().catch((err) => null);

      args[0].data.body = sanitizeFilter(body);
    } else if (options.parseForm) {
      const formData = await req.formData();

      args[0].data.formData = {};
      formData.forEach((value, key) => (args[0].data.formData[key] = value));
    }

    // RATE LIMITING
    const rateLimitError = rateLimit(req);
    if (rateLimitError) return rateLimitError;

    // Retrieve session
    const session = await getServerSession(authOptions);
    args[0].data.session = session;

    // Get user if needed or required
    let user;
    if (session && session.user && (options.getSession || options.requiresSession || options.restrictTo)) {
      await connectDB();

      // Find user if session exists with user
      user = await User.findById(session.user._id);

      // Add user to request data if exists
      if (user) args[0].data.user = user;
    }

    // AUTH: Session requirement
    if (options.requiresSession || options.restrictTo) {
      // Check if a session, and a user on that session exists
      if (!session || !session.user) return new AppError("Please login to perform this action", 401);

      // Check if user exists
      if (!user) return new AppError("Login session is invalid, please login again", 404);
    }

    // AUTH: Role restriction
    if (options.restrictTo && !options.restrictTo.includes(user.role)) {
      return new AppError("You do not have access to this action", 401);
    }

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

function parseQuery(req) {
  const query = req.url.split("?")[1];
  if (!query) return {};
  return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}
