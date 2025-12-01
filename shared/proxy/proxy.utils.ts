"use server";

import { NextRequest } from "next/server";

export const GUEST_ROUTES = ["/login", "/signup"] as const;

export const isGuestRoute = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return GUEST_ROUTES.some((route) => pathname.includes(route));
};

export const hasSession = (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken");
  return !!accessToken;
};

export const isProtectedRoute = (request: NextRequest) => {
  return !isGuestRoute(request);
};
