import Subscription from "@/models/subscriptionModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(Subscription), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const DELETE = routeHandler(deleteOne(Subscription), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const PATCH = routeHandler(updateOne(Subscription), {
  requiresSession: true,
  restrictTo: ["admin"],
});
