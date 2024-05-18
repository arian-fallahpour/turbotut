import Purchase from "@/models/purchaseModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Purchase), { requiresSession: true });
export const POST = createOne(Purchase);
