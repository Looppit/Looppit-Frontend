import { cookies } from 'next/headers';

import { HydrationBoundary } from '@tanstack/react-query';

import { CategoryScreen } from '@/domains/category/category-screen';
import { getCategoryDehydratedState } from '@/domains/category/utils';

export default async function CategoryPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const dehydratedState = await getCategoryDehydratedState(cookieHeader);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoryScreen />
    </HydrationBoundary>
  );
}
