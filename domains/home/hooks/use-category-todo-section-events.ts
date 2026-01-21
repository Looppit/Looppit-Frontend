import { useCallback, useMemo } from 'react';

import { useTodoActionsSheet } from '@/domains/home/hooks/use-todo-actions-sheet';
import { useTodoDeleteSheet } from '@/domains/home/hooks/use-todo-delete-sheet';
import {
  TODO_FORM_MODE,
  useTodoFormSheet,
} from '@/domains/home/hooks/use-todo-form-sheet';
import { useToggleTodo } from '@/domains/home/hooks/use-todo-mutations';
import { TodoActionSheetProps } from '@/domains/home/store/todo-actions-sheet.atom';
import { TodoDeleteSheetProps } from '@/domains/home/store/todo-delete-sheet.atom';
import { TodoFormSheetProps } from '@/domains/home/store/todo-form-sheet.atom';
import { CategoryTodoSectionHandlers } from '@/domains/home/types/category-todo-section.types';
import { useSwipeable } from '@/shared/hooks';

type UseCategoryTodoSectionEventsProps = {
  yearMonth: string;
};

export const useCategoryTodoSectionEvents = ({
  yearMonth,
}: UseCategoryTodoSectionEventsProps): CategoryTodoSectionHandlers => {
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
    (props: Omit<TodoFormSheetProps, 'mode'>) => {
      if (isOpened) return;
      openFormSheet({ mode: TODO_FORM_MODE.EDIT, ...props });
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
