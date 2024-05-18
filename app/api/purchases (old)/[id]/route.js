import Purchase from "@/models/purchaseModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Purchase);
export const DELETE = deleteOne(Purchase);
export const PATCH = updateOne(Purchase);
