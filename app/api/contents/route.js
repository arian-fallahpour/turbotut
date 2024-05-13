import Content from "@/models/contentModel";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = getAll(Content);
export const POST = createOne(Content);
