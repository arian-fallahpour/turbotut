import Order from "@/models/orderModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Order), {
  requiresSession: true,
  restrictTo: ["admin"],
  parameterPollutionWhitelist: ["_id"],
});
export const POST = routeHandler(createOne(Order), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
