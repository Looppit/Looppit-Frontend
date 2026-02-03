import { QueryClient, dehydrate } from '@tanstack/react-query';

import { getCategories } from '@/domains/category/api/category.api';
import { categoriesQueryOptions } from '@/domains/category/utils';
import { prefetchWithCookies } from '@/shared/lib/query';

import { todosQueryOptions } from '.';
import { getTodos } from '../api/todo.api';

export async function getHomeDehydratedState(
  cookieHeader: string,
  yearMonth: string,
): Promise<ReturnType<typeof dehydrate>> {
  const queryClient = new QueryClient();
  await prefetchWithCookies(queryClient, cookieHeader, [
    {
      queryOptions: categoriesQueryOptions(),
      fetcher: (header) => getCategories({ cookieHeader: header }),
    },
    {
      queryOptions: todosQueryOptions(yearMonth),
      fetcher: (header) => getTodos(yearMonth, { cookieHeader: header }),
    },
  ]);
  return dehydrate(queryClient);
}
