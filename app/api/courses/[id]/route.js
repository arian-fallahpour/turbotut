import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const DELETE = routeHandler(deleteOne(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const PATCH = routeHandler(updateOne(Course), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
