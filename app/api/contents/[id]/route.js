import Content from "@/models/contentModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Content);
export const DELETE = deleteOne(Content);
export const PATCH = updateOne(Content);
