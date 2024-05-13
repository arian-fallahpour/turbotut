import Order from "@/models/orderModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Order), { requiresSession: true });
export const POST = createOne(Order);
