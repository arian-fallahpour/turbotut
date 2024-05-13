import User from "@/models/userModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(User), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(User), {
  requiresSession: true,
  restrictTo: ["admin"],
});
