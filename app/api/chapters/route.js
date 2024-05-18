import Chapter from "@/models/chapterModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
