// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session"); // 👈 check for "session" cookie
  const { pathname } = request.nextUrl;

  // Public pages (accessible without login)
  const publicPaths = ["/", "/login", "/signup"];

  // Allow public paths always
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If no session cookie and trying to access protected path → redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If session cookie exists → allow
  return NextResponse.next();
}

// Apply middleware to everything except static files and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
