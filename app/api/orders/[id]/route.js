import Order from "@/models/orderModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Order);
export const DELETE = deleteOne(Order);
export const PATCH = updateOne(Order);
