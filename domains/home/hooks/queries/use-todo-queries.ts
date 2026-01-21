import { useMemo } from 'react';

import { useSuspenseQueries } from '@tanstack/react-query';

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
