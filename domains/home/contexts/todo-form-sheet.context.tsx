'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { TodoApiResponse } from '@/domains/home/types/todo.types';
import { TodoFormSheet } from '@/shared/ui/todo/todo-form-sheet';

export const TODO_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

export type TodoFormMode = (typeof TODO_FORM_MODE)[keyof typeof TODO_FORM_MODE];

type TodoFormSheetContextValue = {
  openSheet: (
    mode: TodoFormMode,
    categoryId: number,
    todo?: TodoApiResponse,
  ) => void;
};

const TodoFormSheetContext = createContext<TodoFormSheetContextValue | null>(
  null,
);

export const TodoFormSheetProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sheetMode, setSheetMode] = useState<TodoFormMode>(
    TODO_FORM_MODE.CREATE,
  );
  const [editingTodo, setEditingTodo] = useState<TodoApiResponse | undefined>();
  const [initialCategoryId, setInitialCategoryId] = useState<number | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = useCallback(
    (mode: TodoFormMode, categoryId: number, todo?: TodoApiResponse) => {
      setSheetMode(mode);
      setInitialCategoryId(categoryId);
      setEditingTodo(todo);
      setIsOpen(true);
    },
    [],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingTodo(undefined);
      setSheetMode(TODO_FORM_MODE.CREATE);
      setInitialCategoryId(null);
    }
  }, []);

  const handleSuccess = useCallback(() => {
    setEditingTodo(undefined);
    setSheetMode(TODO_FORM_MODE.CREATE);
    setInitialCategoryId(null);
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(() => ({ openSheet }), [openSheet]);

  return (
    <TodoFormSheetContext.Provider value={contextValue}>
      {children}
      <TodoFormSheet
        open={isOpen}
        onOpenChange={handleOpenChange}
        mode={sheetMode}
        initialCategoryId={initialCategoryId}
        initialTodo={editingTodo}
        onSuccess={handleSuccess}
      />
    </TodoFormSheetContext.Provider>
  );
};

export const useTodoFormSheet = () => {
  const context = useContext(TodoFormSheetContext);
  if (!context) {
    throw new Error(
      'useTodoFormSheet는 TodoFormSheetProvider 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
