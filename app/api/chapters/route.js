import Chapter from "@/models/chapterModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Chapter), {
  requiresSession: true,
  restrictTo: ["admin"],
  parameterPollutionWhitelist: ["_id"],
});
export const POST = routeHandler(createOne(Chapter), {
  parseBody: true,
  requiresSession: true,
  restrictTo: ["admin"],
});
