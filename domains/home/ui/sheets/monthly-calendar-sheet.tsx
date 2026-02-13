import { TodoCalendar } from '@/domains/todo/ui';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
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
      <DrawerContent aria-describedby="월별 달력" aria-description="월별 달력">
        <DrawerTitle className="sr-only">달력</DrawerTitle>
        <DrawerDescription className="sr-only">
          날짜를 선택하세요.
        </DrawerDescription>
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
