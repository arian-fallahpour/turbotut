import Subscription from "@/models/subscriptionModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Subscription), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Subscription), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
