import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createTodo,
  toggleTodoDone,
  updateTodo,
} from '@/domains/home/api/todo.api';
import { todoKeys } from '@/domains/home/todo.keys';
import {
  CategoryTodoApiResponse,
  CreateCategoryTodoApiRequest,
  UpdateTodoApiRequest,
} from '@/domains/home/types/todo.types';
import { updateTodoInCategory } from '@/domains/home/utils/todo';

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

export const useToggleTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      todoId,
      completed,
    }: {
      categoryId: number;
      todoId: number;
      completed: boolean;
    }) => toggleTodoDone({ categoryId, todoId, completed }),

    onMutate: async ({ categoryId, todoId, completed }) => {
      const queryKey = todoKeys.list(yearMonth);

      await queryClient.cancelQueries({ queryKey });

      const previousTodos =
        queryClient.getQueryData<CategoryTodoApiResponse[]>(queryKey);

      queryClient.setQueryData<CategoryTodoApiResponse[]>(queryKey, (old) =>
        old ? updateTodoInCategory(old, categoryId, todoId, completed) : [],
      );

      return { previousTodos };
    },

    onError: (error, variables, result) => {
      if (result?.previousTodos) {
        queryClient.setQueryData(
          todoKeys.list(yearMonth),
          result.previousTodos,
        );
      }
      toast.error('투두 상태 변경에 실패했어요');
      console.error('투두 토글 오류:', error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list(yearMonth) });
    },
  });
};

export const useUpdateTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, todoId, data }: UpdateTodoApiRequest) =>
      updateTodo({ categoryId, todoId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list(yearMonth) });
      toast.success('투두가 수정되었어요');
    },
    onError: (error) => {
      toast.error('투두 수정에 실패했어요');
      console.error('투두 수정 오류:', error);
    },
  });
};
