'use server';

import { NextRequest } from 'next/server';

import { hasSession, isGuestOnlyRoute, isProtectedRoute } from './proxy.utils';

type GuardRule = {
  when: (req: NextRequest) => boolean;
  redirect: string;
};

export const guardRules: GuardRule[] = [
  {
    when: (req: NextRequest) => isGuestOnlyRoute(req) && hasSession(req),
    redirect: '/',
  },
  {
    when: (req: NextRequest) => isProtectedRoute(req) && !hasSession(req),
    redirect: '/landing',
  },
];
