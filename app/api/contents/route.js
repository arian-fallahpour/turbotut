import Content from "@/models/contentModel";
import { routeHandler } from "@/utils/authentication";
import { createOne, getAll } from "@/utils/factoryHandler";

export const GET = routeHandler(getAll(Content), {
  requiresSession: true,
  restrictTo: ["admin"],
});
export const POST = routeHandler(createOne(Content), {
  requiresSession: true,
  restrictTo: ["admin"],
});
