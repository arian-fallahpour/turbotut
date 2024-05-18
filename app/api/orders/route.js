import Order from "@/models/orderModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Order), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Order), {
  requiresSession: true,
  restrictTo: ["admin"],
});
