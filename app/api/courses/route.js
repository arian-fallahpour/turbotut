import Course from "@/models/courseModel";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = getAll(Course);
export const POST = createOne(Course);
