import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
