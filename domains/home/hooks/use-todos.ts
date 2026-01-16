import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTodo, getTodos } from '../api/todo.api';
import { todoKeys } from '../todo.keys';
import {
  CategoryTodoApiResponse,
  CreateCategoryTodoApiRequest,
} from '../types/todo.types';

export const useTodos = (yearMonth: string) => {
  return useQuery<CategoryTodoApiResponse[]>({
    queryKey: todoKeys.list(yearMonth),
    queryFn: () => getTodos(yearMonth),
  });
};

export const useCreateTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, categoryId }: CreateCategoryTodoApiRequest) =>
      createTodo({ data, categoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list(yearMonth) });
      toast.success('투두가 생성되었어요');
    },
    onError: (error) => {
      toast.error('투두 생성에 실패했어요');
      console.error('투두 생성 오류:', error);
    },
  });
};
