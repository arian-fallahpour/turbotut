import { routeHandler } from "@/utils/authentication";

import { editOneByForm } from "@/utils/factoryHandler";
import Lecture from "@/models/lectureModel";

export const PATCH = routeHandler(editOneByForm(Lecture), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
