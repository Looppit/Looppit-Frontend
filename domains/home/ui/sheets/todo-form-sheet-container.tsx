'use client';

import { useTodoFormSheet } from '@/domains/home/hooks/sheets/use-todo-form-sheet';

import { TodoFormSheet } from './todo-form-sheet';

export const TodoFormSheetContainer = () => {
  const { isOpen, mode, categoryId, editingTodo, closeSheet } =
    useTodoFormSheet();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSheet();
    }
  };

  const handleSuccess = () => {
    closeSheet();
  };

  return (
    <TodoFormSheet
      open={isOpen}
      onOpenChange={handleOpenChange}
      mode={mode}
      initialCategoryId={categoryId}
      initialTodo={editingTodo}
      onSuccess={handleSuccess}
    />
  );
};
