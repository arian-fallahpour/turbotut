import Chapter from "@/models/chapterModel";
import { routeHandler } from "@/utils/authentication";

import { archiveOne } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveOne(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
