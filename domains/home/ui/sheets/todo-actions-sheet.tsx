'use client';

import { addDays, format, parseISO } from 'date-fns';
import { useAtomValue } from 'jotai';

import { useCreateTodo, useUpdateTodo } from '@/domains/home/hooks';
import { todoYearMonthAtom } from '@/domains/home/store';
import {
  SheetComponentProps,
  TodoActionsSheetProps,
} from '@/domains/home/types';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';

export const TodoActionsSheet = ({
  props,
  onClose,
}: SheetComponentProps<TodoActionsSheetProps>) => {
  const { todo, categoryId } = props;
  const yearMonth = useAtomValue(todoYearMonthAtom);
  const updateTodoMutation = useUpdateTodo(yearMonth);
  const createTodoMutation = useCreateTodo(yearMonth);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleRescheduleTodoToTomorrow = () => {
    if (!todo || !categoryId) return;

    updateTodoMutation.mutate(
      {
        categoryId,
        todoId: todo.todoId,
        data: {
          title: todo.title,
          date: format(addDays(parseISO(todo.date), 1), 'yyyy-MM-dd'),
          updateCategory: categoryId,
        },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const handleAddTodoForTomorrow = () => {
    createTodoMutation.mutate(
      {
        categoryId,
        data: {
          title: todo.title,
          date: format(addDays(parseISO(todo.date), 1), 'yyyy-MM-dd'),
        },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <Drawer open={true} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <DrawerHeader className="sr-only">
          <DrawerTitle>투두 메뉴</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            size="body"
            align="start"
            onClick={handleRescheduleTodoToTomorrow}
          >
            <Button.OutlineIcon
              icon="ic_schedule"
              bgColor="bg-green-500/15"
              iconClassName="fill-green-400"
            />
            내일로 미루기
          </Button>
          <Button
            variant="outline"
            size="body"
            align="start"
            onClick={handleAddTodoForTomorrow}
          >
            <Button.OutlineIcon
              icon="ic_event_repeat"
              bgColor="bg-indigo-500/10"
              iconClassName="fill-indigo-500"
            />
            내일도 추가하기
          </Button>
        </div>
        <DrawerClose>닫기</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
