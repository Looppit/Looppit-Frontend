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
  onRescheduleTodoToTomorrow: () => void;
  onAddTodoForTomorrow: () => void;
};

export const TodoActionsSheet = ({
  open,
  onOpenChange,
  onRescheduleTodoToTomorrow,
  onAddTodoForTomorrow,
}: TodoActionsSheetProps) => {
  const handleRescheduleTodoToTomorrow = () => {
    onRescheduleTodoToTomorrow();
    onOpenChange(false);
  };

  const handleAddTodoForTomorrow = () => {
    onAddTodoForTomorrow();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
