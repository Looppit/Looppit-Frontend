import { cookies } from 'next/headers';

import { HydrationBoundary } from '@tanstack/react-query';
import { format } from 'date-fns';

import { HomeScreen } from '@/domains/home/home-screen';
import { getHomeDehydratedState } from '@/domains/home/utils';

export default async function HomePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const yearMonth = format(new Date(), 'yyyy-MM');

  const dehydratedState = await getHomeDehydratedState(cookieHeader, yearMonth);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeScreen />
    </HydrationBoundary>
  );
}
