import { cookies } from 'next/headers';

import { HydrationBoundary } from '@tanstack/react-query';

import CategoryFormScreen from '@/domains/category/category-form-screen';
import { getCategoryDehydratedState } from '@/domains/category/utils';

export default async function CategoryAddPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const dehydratedState = await getCategoryDehydratedState(cookieHeader);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoryFormScreen mode="create" />
    </HydrationBoundary>
  );
}
