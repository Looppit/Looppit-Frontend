import { queryOptions } from '@tanstack/react-query';

import { getCategories } from '../api/category.api';
import { categoryKeys } from '../category.keys';
import { CategoryResponse } from '../types/category.types';

export const categoriesQueryOptions = () => {
  return queryOptions<CategoryResponse>({
    queryKey: categoryKeys.list(),
    queryFn: () => getCategories(),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
