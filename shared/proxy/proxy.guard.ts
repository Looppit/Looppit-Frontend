"use server";

import { NextRequest } from "next/server";
import { isGuestRoute, hasSession, isProtectedRoute } from "./proxy.utils";

type GuardRule = {
  when: (req: NextRequest) => boolean;
  redirect: string;
};

export const guardRules: GuardRule[] = [
  {
    when: (req: NextRequest) => isGuestRoute(req) && hasSession(req),
    redirect: "/",
  },
  {
    when: (req: NextRequest) => isProtectedRoute(req) && !hasSession(req),
    redirect: "/login",
  },
];
