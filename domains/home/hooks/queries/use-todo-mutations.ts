import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createTodo,
  toggleTodoDone,
  updateTodo,
  deleteTodo,
} from '@/domains/home/api/todo.api';
import { todoKeys } from '@/domains/home/todo.keys';
import {
  CategoryWithTodosResponse,
  CreateTodoParams,
  DeleteTodoParams,
  ToggleTodoParams,
  UpdateTodoParams,
} from '@/domains/home/types';
import {
  invalidateTodoListQueries,
  updateTodoInCategory,
} from '@/domains/home/utils';
import { trackEvent } from '@/shared/lib/posthog';

export const useCreateTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, categoryId }: CreateTodoParams) =>
      createTodo({ data, categoryId }),
    onSuccess: () => {
      trackEvent('todo_created');
      invalidateTodoListQueries(queryClient, yearMonth);
      toast.success('할 일이 생성되었어요');
    },
    onError: (error) => {
      toast.error('할 일 생성에 실패했어요');
      console.error('할 일 생성 오류:', error);
    },
  });
};

export const useToggleTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, todoId, completed }: ToggleTodoParams) =>
      toggleTodoDone({ categoryId, todoId, completed }),

    onMutate: async ({ categoryId, todoId, completed }) => {
      const queryKey = todoKeys.list(yearMonth);

      await queryClient.cancelQueries({ queryKey });

      const previousTodos =
        queryClient.getQueryData<CategoryWithTodosResponse[]>(queryKey);

      queryClient.setQueryData<CategoryWithTodosResponse[]>(queryKey, (old) =>
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
      toast.error('할 일 상태 변경에 실패했어요');
      console.error('할 일 토글 오류:', error);
    },

    onSettled: (_, __, variables) => {
      trackEvent('todo_toggled', { completed: variables.completed });
      invalidateTodoListQueries(queryClient, yearMonth);
    },
  });
};

export const useUpdateTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, todoId, data }: UpdateTodoParams) =>
      updateTodo({ categoryId, todoId, data }),
    onSuccess: () => {
      trackEvent('todo_updated');
      invalidateTodoListQueries(queryClient, yearMonth);
      toast.success('할 일이 수정되었어요');
    },
    onError: (error) => {
      toast.error('할 일 수정에 실패했어요');
      console.error('할 일 수정 오류:', error);
    },
  });
};

export const useDeleteTodo = (yearMonth: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, todoId }: DeleteTodoParams) =>
      deleteTodo({ categoryId, todoId }),
    onSuccess: () => {
      trackEvent('todo_deleted');
      invalidateTodoListQueries(queryClient, yearMonth);
      toast.success('할 일이 삭제되었어요');
    },
    onError: (error) => {
      toast.error('할 일 삭제에 실패했어요');
      console.error('할 일 삭제 오류:', error);
    },
  });
};
