import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("Auth:", req.auth);

  const isAuthenticated = !!req.auth;
  const { nextUrl } = req;

  if (nextUrl.pathname === "/signin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/chats", nextUrl.origin));
  }

  if (!isAuthenticated && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/signin", "/dashboard/:path*"],
};
