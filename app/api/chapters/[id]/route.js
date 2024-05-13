import Chapter from "@/models/chapterModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Chapter);
export const DELETE = deleteOne(Chapter);
export const PATCH = updateOne(Chapter);
