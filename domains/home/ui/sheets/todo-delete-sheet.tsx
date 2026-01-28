'use client';

import { useMemo } from 'react';

import { useDeleteTodo } from '@/domains/home/hooks';
import {
  SheetComponentProps,
  TodoDeleteSheetProps,
} from '@/domains/home/types';
import { dayjs } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';

export const TodoDeleteSheet = ({
  props,
  onClose,
}: SheetComponentProps<TodoDeleteSheetProps>) => {
  const { todo, categoryId } = props;

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const deleteTodoMutation = useDeleteTodo(yearMonth);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate({
      categoryId,
      todoId: todo.todoId,
    });
  };

  return (
    <Drawer open={true} onOpenChange={handleOpenChange}>
      <DrawerHeader className="sr-only">
        <DrawerTitle>투두 삭제</DrawerTitle>
        <DrawerDescription />
      </DrawerHeader>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <div className="px-6 py-4 flex flex-col gap-6">
          <div className="text-center space-y-2">
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
      </DrawerContent>
    </Drawer>
  );
};
