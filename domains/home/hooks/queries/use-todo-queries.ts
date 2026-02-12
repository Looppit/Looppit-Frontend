import { useMemo } from 'react';

import {
  useQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { categoriesQueryOptions } from '@/domains/category/utils';
import { todosQueryOptions } from '@/domains/home/utils';

export const useTodosAndCategories = (yearMonth: string) => {
  const [{ data: todosData }, { data: categories }] = useSuspenseQueries({
    queries: [todosQueryOptions(yearMonth), categoriesQueryOptions()],
  });

  return useMemo(
    () => ({
      todosData: todosData ?? [],
      categories: categories ?? [],
    }),
    [todosData, categories],
  );
};

export const useTodosByDate = (
  date: string | null,
  enabled: boolean = true,
) => {
  return useQuery({
    ...todosQueryOptions(date ?? ''),
    enabled,
  });
};

export const useTodosWithSuspense = (yearMonth: string) => {
  return useSuspenseQuery({
    ...todosQueryOptions(yearMonth),
  });
};
