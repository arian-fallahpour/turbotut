import { NextResponse } from "next/server";
import { rateLimit } from "./utils/security";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    // Rate limiting
    // Security HTTP headers
    // Data sanitization against NoSQL query injection
    // Data sanitization against XSS
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
