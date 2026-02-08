import { TodoCalendar } from '@/domains/todo/ui';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { IconButton } from '@/shared/ui/icon-button';

import { CompletedCategoryData } from '../../utils';

interface MonthlyCalendarSheetProps {
  selectedDate: Date;
  onSelect: (date: Date | undefined) => void;
  completedCategoryData: CompletedCategoryData;
  onNavigate: (date: Date) => void;
}

export function MonthlyCalendarSheet({
  selectedDate,
  onSelect,
  completedCategoryData,
  onNavigate,
}: MonthlyCalendarSheetProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <IconButton
          icon="ic_calendar_month"
          size="40"
          className="absolute top-0 right-0 cursor-pointer"
          iconClassName="w-[18px] h-[18px] fill-secondary"
        />
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-[400px]">
          <TodoCalendar
            onNavigate={onNavigate}
            mode="single"
            type="monthly"
            selected={new Date(selectedDate)}
            onSelect={onSelect}
            completedColors={completedCategoryData}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
