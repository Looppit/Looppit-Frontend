import { useQuery } from '@tanstack/react-query';

import { getTodos } from '../api/todo.api';
import { todoKeys } from '../todo.keys';
import { CategoryTodoApiResponse } from '../types/todo.types';

export const useTodos = (yearMonth: string) => {
  return useQuery<CategoryTodoApiResponse[]>({
    queryKey: todoKeys.list(yearMonth),
    queryFn: () => getTodos(yearMonth),
  });
};
