'use client';

import { useMemo } from 'react';

import { useCreateTodo, useUpdateTodo } from '@/domains/home/hooks/queries';
import { useTodoActionsSheet } from '@/domains/home/hooks/sheets';
import { dayjs } from '@/shared/lib';

import { TodoActionsSheet } from './todo-actions-sheet';

const handleMutationSuccess = (reset: () => void) => {
  reset();
};

export const TodoActionsSheetContainer = () => {
  const { isOpen, todo, categoryId, closeSheet } = useTodoActionsSheet();

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const updateTodoMutation = useUpdateTodo(yearMonth);
  const createTodoMutation = useCreateTodo(yearMonth);

  const handleRescheduleTodoToTomorrow = () => {
    if (!todo || !categoryId) return;

    updateTodoMutation.mutate(
      {
        categoryId,
        todoId: todo.todoId,
        data: {
          title: todo.title,
          date: dayjs(todo.date).add(1, 'day').format('YYYY-MM-DD'),
          updateCategory: categoryId,
        },
      },
      {
        onSuccess: () => handleMutationSuccess(closeSheet),
      },
    );
  };

  const handleAddTodoForTomorrow = () => {
    if (!todo || !categoryId) return;

    createTodoMutation.mutate(
      {
        categoryId,
        data: {
          title: todo.title,
          date: dayjs(todo.date).add(1, 'day').format('YYYY-MM-DD'),
        },
      },
      {
        onSuccess: () => handleMutationSuccess(closeSheet),
      },
    );
  };

  return (
    <TodoActionsSheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeSheet();
        }
      }}
      onRescheduleTodoToTomorrow={handleRescheduleTodoToTomorrow}
      onAddTodoForTomorrow={handleAddTodoForTomorrow}
    />
  );
};
