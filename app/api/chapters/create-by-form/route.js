import { routeHandler } from "@/utils/authentication";

import Chapter from "@/models/chapterModel";
import { createOneByForm } from "@/utils/factoryHandler";

export const POST = routeHandler(createOneByForm(Chapter), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
