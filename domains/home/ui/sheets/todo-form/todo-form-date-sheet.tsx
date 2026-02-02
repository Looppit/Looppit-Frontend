import { TodoCalendar } from '@/domains/todo/ui';
import { Drawer, DrawerContent } from '@/shared/ui/drawer';

import { CompletedCategoryData } from '../../../utils';

interface TodoFormDateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onSelect: (date: Date | undefined) => void;
  completedCategoryData: CompletedCategoryData;
}

export function TodoFormDateSheet({
  open,
  onOpenChange,
  selectedDate,
  onSelect,
  completedCategoryData,
}: TodoFormDateSheetProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <TodoCalendar
          mode="single"
          type="monthly"
          selected={new Date(selectedDate)}
          onSelect={onSelect}
          completedColors={completedCategoryData}
        />
      </DrawerContent>
    </Drawer>
  );
}
