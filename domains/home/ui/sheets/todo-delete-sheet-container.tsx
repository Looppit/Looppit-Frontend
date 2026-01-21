'use client';

import { useMemo } from 'react';

import { useDeleteTodo } from '@/domains/home/hooks/queries/use-todo-mutations';
import { useTodoDeleteSheet } from '@/domains/home/hooks/sheets/use-todo-delete-sheet';
import { dayjs } from '@/shared/lib';

import { TodoDeleteSheet } from './todo-delete-sheet';

export const TodoDeleteSheetContainer = () => {
  const { isOpen, categoryId, todo, closeSheet } = useTodoDeleteSheet();

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const deleteTodoMutation = useDeleteTodo(yearMonth);

  const handleDelete = () => {
    if (!todo || !categoryId) return;
    deleteTodoMutation.mutate({
      categoryId,
      todoId: todo.todoId,
    });
  };

  return (
    <TodoDeleteSheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeSheet();
        }
      }}
      onDelete={handleDelete}
    />
  );
};
