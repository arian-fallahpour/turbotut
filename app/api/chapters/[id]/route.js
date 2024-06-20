import Chapter from "@/models/chapterModel";
import { routeHandler } from "@/utils/authentication";
import { deleteOne, getOne, updateOne } from "@/utils/factoryHandler";

export const GET = routeHandler(getOne(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const DELETE = routeHandler(deleteOne(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const PATCH = routeHandler(updateOne(Chapter), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
