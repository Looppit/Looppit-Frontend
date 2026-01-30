import { useCallback, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { SHEET_TYPE, TODO_FORM_MODE } from '@/domains/home/constants';
import { useToggleTodo } from '@/domains/home/hooks/queries';
import { openSheetAtom } from '@/domains/home/store';
import { TodoResponse } from '@/domains/home/types';
import { useSwipeable } from '@/shared/hooks';
import { dayjs } from '@/shared/lib';

type UseTodoSectionProps = {
  categoryId: number;
};

type TodoSectionHandlers = {
  onAddClick: () => void;
  onTitleClick: () => void;
  onLabelClick: (todo: TodoResponse) => void;
  onOpenActions: (todo: TodoResponse) => void;
  onDelete: (todo: TodoResponse) => void;
  onToggle: (todoId: number, checked: boolean) => void;
};

export const useTodoSection = ({
  categoryId,
}: UseTodoSectionProps): TodoSectionHandlers => {
  const openSheet = useSetAtom(openSheetAtom);
  const { isOpened } = useSwipeable();
  const yearMonth = dayjs().format('YYYY-MM');
  const toggleTodoMutation = useToggleTodo(yearMonth);

  const onAddClick = useCallback(() => {
    openSheet({
      type: SHEET_TYPE.TODO_FORM,
      props: { mode: TODO_FORM_MODE.CREATE, categoryId },
    });
  }, [openSheet, categoryId]);

  const onLabelClick = useCallback(
    (todo: TodoResponse) => {
      if (isOpened) return;
      openSheet({
        type: SHEET_TYPE.TODO_FORM,
        props: {
          mode: TODO_FORM_MODE.EDIT,
          todo,
          categoryId,
        },
      });
    },
    [isOpened, openSheet, categoryId],
  );

  const onTitleClick = useCallback(() => {
    if (isOpened) return;
    openSheet({
      type: SHEET_TYPE.TODO_CATEGORY_UTILS,
      props: {
        categoryId,
      },
    });
  }, [isOpened, openSheet, categoryId]);

  const onOpenActions = useCallback(
    (todo: TodoResponse) => {
      openSheet({
        type: SHEET_TYPE.TODO_ACTIONS,
        props: { todo, categoryId },
      });
    },
    [openSheet, categoryId],
  );

  const onDelete = useCallback(
    (todo: TodoResponse) => {
      openSheet({
        type: SHEET_TYPE.TODO_DELETE,
        props: { todo, categoryId },
      });
    },
    [openSheet, categoryId],
  );

  const onToggle = useCallback(
    (todoId: number, checked: boolean) => {
      toggleTodoMutation.mutate({ categoryId, todoId, completed: checked });
    },
    [categoryId, toggleTodoMutation],
  );

  return useMemo(
    () => ({
      onAddClick,
      onTitleClick,
      onLabelClick,
      onOpenActions,
      onDelete,
      onToggle,
    }),
    [onAddClick, onTitleClick, onLabelClick, onOpenActions, onDelete, onToggle],
  );
};
