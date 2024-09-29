import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedPaths = ["/", "/search", "/gituser/[slug]"];

  if (!token && protectedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (
    token &&
    (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/search", "/signin", "/signup", "/gituser/:slug*"],
};
