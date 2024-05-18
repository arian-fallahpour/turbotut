import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { archiveDocument } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveDocument(Lecture), {
  requiresSession: true,
  restrictTo: ["admin"],
});
