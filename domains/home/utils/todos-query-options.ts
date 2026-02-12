import { queryOptions } from '@tanstack/react-query';

import { getTodos } from '../api/todo.api';
import { todoKeys } from '../todo.keys';
import { CategoryWithTodosResponse } from '../types/todo.types';

export const todosQueryOptions = (yearMonth: string) => {
  return queryOptions<CategoryWithTodosResponse[]>({
    queryKey: todoKeys.list(yearMonth),
    queryFn: () => getTodos(yearMonth),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
