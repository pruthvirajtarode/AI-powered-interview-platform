import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is authenticated and trying to access login/register/home, redirect to dashboard
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token && (pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Allow all pages through, we handle redirect logic above
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/register", "/signup"],
};
