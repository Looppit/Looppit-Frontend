'use server';

import { NextRequest } from 'next/server';

import { COOKIE_KEYS } from '@/shared/constants';

/** 로그인/비로그인 둘 다 접근 가능 */
export const ROUTES_PUBLIC = ['/privacy'] as const;

/** 비로그인시에만 접근 가능. 로그인 시 / 로 리다이렉트 */
export const ROUTES_GUEST_ONLY = ['/landing', '/login', '/signup'] as const;

const isPathInRoutes = (pathname: string, routes: readonly string[]) =>
  routes.some((route) => pathname.includes(route));

export const isAccessibleWithoutAuth = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return (
    isPathInRoutes(pathname, ROUTES_PUBLIC) ||
    isPathInRoutes(pathname, ROUTES_GUEST_ONLY)
  );
};

export const isGuestOnlyRoute = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return isPathInRoutes(pathname, ROUTES_GUEST_ONLY);
};

export const hasSession = (request: NextRequest) => {
  const accessToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
  return !!accessToken;
};

export const isProtectedRoute = (request: NextRequest) => {
  return !isAccessibleWithoutAuth(request);
};
