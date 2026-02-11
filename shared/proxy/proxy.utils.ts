'use server';

import { NextRequest } from 'next/server';

import { COOKIE_KEYS } from '@/shared/constants';

export const GUEST_ROUTES = [
  '/landing',
  '/login',
  '/signup',
  '/privacy',
] as const;

export const isGuestRoute = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return GUEST_ROUTES.some((route) => pathname.includes(route));
};

export const hasSession = (request: NextRequest) => {
  const accessToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
  return !!accessToken;
};

export const isProtectedRoute = (request: NextRequest) => {
  return !isGuestRoute(request);
};
