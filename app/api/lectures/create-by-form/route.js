import { routeHandler } from "@/utils/authentication";

import { createOneByForm } from "@/utils/factoryHandler";
import Lecture from "@/models/lectureModel";

export const POST = routeHandler(createOneByForm(Lecture), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
