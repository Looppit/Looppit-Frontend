import { cookies } from 'next/headers';

import { HydrationBoundary } from '@tanstack/react-query';

import { CategoryDetailScreen } from '@/domains/category/category-detail-screen';
import { getCategoryDehydratedState } from '@/domains/category/utils';

export default async function CategoryDetailPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const dehydratedState = await getCategoryDehydratedState(cookieHeader);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoryDetailScreen />
    </HydrationBoundary>
  );
}
