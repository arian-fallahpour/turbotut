import Chapter from "@/models/chapterModel";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = getAll(Chapter);
export const POST = createOne(Chapter);
