'use client';

import { createContext, useContext, useMemo, useCallback } from 'react';

import {
  TODO_FORM_MODE,
  useTodoActionsSheet,
  useTodoDeleteSheet,
  useTodoFormSheet,
  useToggleTodo,
} from '@/domains/home/hooks';
import {
  EditTodoFormSheetProps,
  TodoActionSheetProps,
  TodoDeleteSheetProps,
} from '@/domains/home/store';
import { useSwipeable } from '@/shared/hooks';
import { StrictPropsWithChildren } from '@/shared/types';

type TodoSectionHandlers = {
  onTodoCheckedChange: (
    categoryId: number,
    todoId: number,
    checked: boolean,
  ) => void;
  onLabelClick: (props: EditTodoFormSheetProps) => void;
  onOpenTodoActions: (props: TodoActionSheetProps) => void;
  onDeleteTodo: (props: TodoDeleteSheetProps) => void;
  onAddClick: (categoryId: number) => void;
  onTitleClick: (categoryId: number) => void;
};

const TodoSectionEventContext = createContext<TodoSectionHandlers | null>(null);

type TodoSectionEventProviderProps = {
  yearMonth: string;
};

const useTodoSectionHandlers = ({
  yearMonth,
}: TodoSectionEventProviderProps): TodoSectionHandlers => {
  const { openSheet: openFormSheet } = useTodoFormSheet();
  const { openSheet: openActionsSheet } = useTodoActionsSheet();
  const { openSheet: openDeleteSheet } = useTodoDeleteSheet();
  const { isOpened } = useSwipeable();
  const toggleTodoMutation = useToggleTodo(yearMonth);

  const onTodoCheckedChange = useCallback(
    (categoryId: number, todoId: number, checked: boolean) => {
      toggleTodoMutation.mutate({ categoryId, todoId, completed: checked });
    },
    [toggleTodoMutation],
  );

  const onAddClick = useCallback(
    (categoryId: number) => {
      openFormSheet({ mode: TODO_FORM_MODE.CREATE, categoryId });
    },
    [openFormSheet],
  );

  const onLabelClick = useCallback(
    (props: EditTodoFormSheetProps) => {
      if (isOpened) return;
      openFormSheet({
        mode: TODO_FORM_MODE.EDIT,
        ...props,
      });
    },
    [openFormSheet, isOpened],
  );

  const onTitleClick = useCallback(() => {
    // TODO: 카테고리 상세 페이지로 이동
  }, []);

  const onDeleteTodo = useCallback(
    (props: TodoDeleteSheetProps) => openDeleteSheet(props),
    [openDeleteSheet],
  );

  const onOpenTodoActions = useCallback(
    (props: TodoActionSheetProps) => openActionsSheet(props),
    [openActionsSheet],
  );

  return useMemo(
    () => ({
      onTodoCheckedChange,
      onAddClick,
      onLabelClick,
      onTitleClick,
      onDeleteTodo,
      onOpenTodoActions,
    }),
    [
      onTodoCheckedChange,
      onAddClick,
      onLabelClick,
      onTitleClick,
      onDeleteTodo,
      onOpenTodoActions,
    ],
  );
};

export const TodoSectionEventProvider = ({
  children,
  yearMonth,
}: StrictPropsWithChildren<TodoSectionEventProviderProps>) => {
  const handlers = useTodoSectionHandlers({ yearMonth });

  return (
    <TodoSectionEventContext.Provider value={handlers}>
      {children}
    </TodoSectionEventContext.Provider>
  );
};

export const useTodoSectionEvents = () => {
  const context = useContext(TodoSectionEventContext);
  if (!context) {
    throw new Error(
      'useTodoSectionEvents는 TodoSectionEventProvider 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
