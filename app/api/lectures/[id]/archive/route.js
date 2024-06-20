import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { archiveOne } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveOne(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
