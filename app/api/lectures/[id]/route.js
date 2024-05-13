import Lecture from "@/models/lectureModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Lecture);
export const DELETE = deleteOne(Lecture);
export const PATCH = updateOne(Lecture);
