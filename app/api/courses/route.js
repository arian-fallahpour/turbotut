import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
  parameterPollutionWhitelist: ["_id"],
});
export const POST = routeHandler(createOne(Course), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
