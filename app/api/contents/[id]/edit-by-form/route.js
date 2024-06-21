import { routeHandler } from "@/utils/authentication";

import { editOneByForm } from "@/utils/factoryHandler";
import Content from "@/models/contentModel";

export const PATCH = routeHandler(editOneByForm(Content), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
