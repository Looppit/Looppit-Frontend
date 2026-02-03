import { QueryClient, dehydrate } from '@tanstack/react-query';

import { prefetchWithCookies } from '@/shared/lib/query';

import { categoriesQueryOptions } from '.';
import { getCategories } from '../api/category.api';

export async function getCategoryDehydratedState(
  cookieHeader: string,
): Promise<ReturnType<typeof dehydrate>> {
  const queryClient = new QueryClient();
  await prefetchWithCookies(queryClient, cookieHeader, [
    {
      queryOptions: categoriesQueryOptions(),
      fetcher: (header) => getCategories({ cookieHeader: header }),
    },
  ]);
  return dehydrate(queryClient);
}
