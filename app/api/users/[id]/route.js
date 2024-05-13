import User from "@/models/userModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(User), {
  requiresSession: true,
  restrictTo: ["admin"],
});

export const DELETE = routeHandler(deleteOne(User), {
  requiresSession: true,
  restrictTo: ["admin"],
});

export const PATCH = routeHandler(updateOne(User), {
  requiresSession: true,
  restrictTo: ["admin"],
});
