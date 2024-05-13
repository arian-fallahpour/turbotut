import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";
import errorHandler from "./utils/errorHandler";
import AppError from "./utils/AppError";

// TODO: Should probably make all factoryHandler routes admin ones
const routesAdmin = [
  { method: "GET", path: "/dashboard" },

  { method: "ALL", path: "/api/users" },
  { method: "ALL", path: "/api/users/:id" },

  { method: "ALL", path: "/api/lectures" },
  { method: "ALL", path: "/api/lectures/:id" },
  { method: "ALL", path: "/api/lectures/:id/archive" },

  { method: "ALL", path: "/api/chapters" },
  { method: "ALL", path: "/api/chapters/:id" },
  { method: "ALL", path: "/api/chapters/:id/archive" },
  { method: "ALL", path: "/api/chapters/:id/hard" },
  { method: "PATCH", path: "/api/chapters/:id/swap-chapters-indices" },

  { method: "POST", path: "/api/courses" },
  { method: "POST", path: "/api/courses/:id" },
  { method: "PATCH", path: "/api/courses/:id" },
  { method: "ALL", path: "/api/courses/:id/hard" },
];
const routesProtected = [{ method: "GET", path: "/profile" }, ...routesAdmin];

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // TODO:  Remove this and make a handler function for each route that searches for the user in the database
    //        This method is insecure because someone can edit the token and set themselves as admin

    // Check if current path requires a session
    // const missingSession = routesProtected.find(
    //   (route) => matcher(req.method, path, route) && !token
    // );
    // if (missingSession && path.startsWith("/api")) {
    //   return errorHandler(new AppError("Login to access this route", 401));
    // } else if (missingSession) {
    //   return NextResponse.redirect(new URL("/?login=true", req.url));
    // }

    // // Check if current path requires the admin role
    // const notAdmin = routesAdmin.find(
    //   (route) => matcher(req.method, path, route) && token.role !== "admin"
    // );
    // if (notAdmin && path.startsWith("/api")) {
    //   return errorHandler(
    //     new AppError("You do not have access to this route", 401)
    //   );
    // } else if (notAdmin) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

function matcher(method, path, route) {
  const escapeDots = (s) =>
    Array.from(s, (c) => (c === "." ? "\\." : c)).join("");

  const reg = new RegExp(
    `^${route.path
      .split("/")
      .map((s) => (s.startsWith(":") ? "[^/]+" : escapeDots(s)))
      .join("/")}$`
  );

  if (route.method === "ALL") {
    return reg.test(path);
  } else {
    return reg.test(path) && method === route.method;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
