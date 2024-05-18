import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const DELETE = routeHandler(deleteOne(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const PATCH = routeHandler(updateOne(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
