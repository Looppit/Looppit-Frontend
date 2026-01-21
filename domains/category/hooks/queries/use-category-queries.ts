import { useQuery } from '@tanstack/react-query';

import { categoriesQueryOptions } from '@/domains/category/utils';

export const useCategories = (options?: { enabled?: boolean }) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    ...categoriesQueryOptions(),
    enabled,
  });
};
