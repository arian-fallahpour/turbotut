import Order from "@/models/orderModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(Order), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const DELETE = routeHandler(deleteOne(Order), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const PATCH = routeHandler(updateOne(Order), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
