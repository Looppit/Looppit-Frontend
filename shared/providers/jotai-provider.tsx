'use client';

import { Provider } from 'jotai';

import { StrictPropsWithChildren } from '@/shared/types/components';

export function JotaiProvider({ children }: StrictPropsWithChildren) {
  return <Provider>{children}</Provider>;
}
