import { routeHandler } from "@/utils/authentication";

import { editOneByForm } from "@/utils/factoryHandler";
import Chapter from "@/models/chapterModel";

export const PATCH = routeHandler(editOneByForm(Chapter), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
