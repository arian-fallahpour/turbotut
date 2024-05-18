import Course from "@/models/courseModel";
import { routeHandler } from "@/utils/authentication";
import { archiveDocument } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveDocument(Course), {
  requiresSession: true,
  restrictTo: ["admin"],
});
