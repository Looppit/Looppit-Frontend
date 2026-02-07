import { queryOptions } from '@tanstack/react-query';

import { getTodos } from '../api/todo.api';
import { todoKeys } from '../todo.keys';
import { CategoryWithTodosResponse } from '../types/todo.types';

export const todosQueryOptions = (
  yearMonth: string | null,
  enabled: boolean = true,
) => {
  if (!yearMonth)
    return queryOptions<CategoryWithTodosResponse[]>({
      queryKey: todoKeys.base.append(),
      queryFn: () => getTodos(null),
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled,
    });

  return queryOptions<CategoryWithTodosResponse[]>({
    queryKey: todoKeys.list(yearMonth),
    queryFn: () => getTodos(yearMonth),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
  });
};
