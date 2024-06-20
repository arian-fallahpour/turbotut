import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";
import { archiveOne } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveOne(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
