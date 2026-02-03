import { cookies } from 'next/headers';

import { HydrationBoundary } from '@tanstack/react-query';

import { getBaseDehydratedState } from '@/domains/user/utils';
import { StrictPropsWithChildren } from '@/shared/types/components';
import { BottomNavigation } from '@/shared/ui/bottom-navigation';

export default async function MainLayout({
  children,
}: StrictPropsWithChildren) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const baseState = await getBaseDehydratedState(cookieHeader);

  return (
    <HydrationBoundary state={baseState}>
      {children}
      <div className="h-[65px]" />
      <div className="fixed bottom-0 w-full max-w-xl">
        <BottomNavigation />
      </div>
    </HydrationBoundary>
  );
}
