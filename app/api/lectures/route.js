import Lecture from "@/models/lectureModel";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = getAll(Lecture);
export const POST = createOne(Lecture);
