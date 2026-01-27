'use client';

import { useMemo } from 'react';

import { useDeleteTodo, useTodoDeleteSheet } from '@/domains/home/hooks';
import { dayjs } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

export const TodoDeleteSheet = () => {
  const { isOpen, categoryId, todo, closeSheet } = useTodoDeleteSheet();

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const deleteTodoMutation = useDeleteTodo(yearMonth);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSheet();
    }
  };

  const handleCancel = () => {
    closeSheet();
  };

  const handleDelete = () => {
    if (!todo || !categoryId) return;
    deleteTodoMutation.mutate({
      categoryId,
      todoId: todo.todoId,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetHeader className="sr-only">
        <SheetTitle>투두 삭제</SheetTitle>
        <SheetDescription />
      </SheetHeader>
      <SheetContent side="bottom" className="bg-card rounded-t-3xl p-6">
        <div className="px-6 pb-12 pt-8 flex flex-col gap-8">
          <div className="text-center space-y-3">
            <h3 className="text-white typography-title-lg">
              정말 삭제하시겠어요?
            </h3>
            <p className="typography-body-semibold opacity-80 px-4 text-secondary">
              삭제하면 기록이 사라지고 되돌릴 수 없어요.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
