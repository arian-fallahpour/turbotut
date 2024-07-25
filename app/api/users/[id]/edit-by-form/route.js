import { routeHandler } from "@/utils/authentication";

import { editOneByForm } from "@/utils/factoryHandler";
import User from "@/models/userModel";

export const PATCH = routeHandler(editOneByForm(User), {
  parseForm: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
