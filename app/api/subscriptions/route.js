import Subscription from "@/models/subscriptionModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Subscription), {
  requiresSession: true,
});
export const POST = createOne(Subscription);
