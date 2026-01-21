'use client';

import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

type TodoActionsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export const TodoDeleteSheet = ({
  open,
  onOpenChange,
  onDelete,
}: TodoActionsSheetProps) => {
  const handleEdit = () => {
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
            <Button variant="secondary" className="w-full" onClick={handleEdit}>
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
