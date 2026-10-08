import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (not /admin/login or /api/admin/*)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    const session = request.cookies.get("admin_session")?.value;
    const secret = process.env.ADMIN_SECRET;

    // If no session or session doesn't match secret → redirect to login
    if (!session || !secret || session !== secret) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
