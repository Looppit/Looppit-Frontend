'use client';

import { SessionProvider } from 'next-auth/react';

import { StrictPropsWithChildren } from '@/shared/types/components';

export function NextAuthSessionProvider({ children }: StrictPropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
