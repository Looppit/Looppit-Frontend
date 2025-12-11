'use server';

import { NextRequest } from 'next/server';

export const GUEST_ROUTES = ['/landing', '/login', '/signup'] as const;

export const isGuestRoute = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return GUEST_ROUTES.some((route) => pathname.includes(route));
};

export const hasSession = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken');
  return !!refreshToken;
};

export const isProtectedRoute = (request: NextRequest) => {
  return !isGuestRoute(request);
};
