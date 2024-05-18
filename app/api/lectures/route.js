import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
