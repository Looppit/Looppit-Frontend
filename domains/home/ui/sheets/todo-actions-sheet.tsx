'use client';

import { useMemo } from 'react';

import { useCreateTodo, useUpdateTodo } from '@/domains/home/hooks';
import { useTodoActionsSheet } from '@/domains/home/hooks/sheets';
import { dayjs } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

export const TodoActionsSheet = () => {
  const { isOpen, todo, categoryId, closeSheet } = useTodoActionsSheet();

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const updateTodoMutation = useUpdateTodo(yearMonth);
  const createTodoMutation = useCreateTodo(yearMonth);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSheet();
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
          date: dayjs(todo.date).add(1, 'day').format('YYYY-MM-DD'),
          updateCategory: categoryId,
        },
      },
      {
        onSuccess: () => closeSheet(),
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
        onSuccess: () => closeSheet(),
      },
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="bg-card rounded-t-3xl p-6">
        <SheetHeader className="sr-only">
          <SheetTitle>투두 메뉴</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col gap-3 mt-6">
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
      </SheetContent>
    </Sheet>
  );
};
