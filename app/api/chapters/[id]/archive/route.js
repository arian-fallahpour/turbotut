import Chapter from "@/models/chapterModel";
import { routeHandler } from "@/utils/authentication";

import { archiveDocument } from "@/utils/factoryHandler";

export const PATCH = routeHandler(archiveDocument(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
