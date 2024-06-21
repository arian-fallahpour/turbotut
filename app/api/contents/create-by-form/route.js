import { routeHandler } from "@/utils/authentication";

import { createOneByForm } from "@/utils/factoryHandler";
import Content from "@/models/contentModel";

export const POST = routeHandler(createOneByForm(Content), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
