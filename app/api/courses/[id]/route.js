import Course from "@/models/courseModel";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = getOne(Course);
export const DELETE = deleteOne(Course);
export const PATCH = updateOne(Course);
