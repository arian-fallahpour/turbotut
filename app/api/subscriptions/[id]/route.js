import Subscription from "@/models/subscriptionModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Subscription);
export const DELETE = deleteOne(Subscription);
export const PATCH = updateOne(Subscription);
