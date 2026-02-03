import { TodoCalendar } from '@/domains/todo/ui';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { IconButton } from '@/shared/ui/icon-button';

import { CompletedCategoryData } from '../../utils';

interface MonthlyCalendarSheetProps {
  selectedDate: Date;
  onSelect: (date: Date | undefined) => void;
  completedCategoryData: CompletedCategoryData;
}

export function MonthlyCalendarSheet({
  selectedDate,
  onSelect,
  completedCategoryData,
}: MonthlyCalendarSheetProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <IconButton
          icon="ic_calendar_month"
          size="40"
          className="absolute top-0 right-0"
          iconClassName="w-[18px] h-[18px] fill-secondary"
        />
      </DrawerTrigger>
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
