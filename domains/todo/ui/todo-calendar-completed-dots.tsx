import { DayProps } from 'react-day-picker';

import { format } from 'date-fns';

import { CompletedCategoryData } from '@/domains/home/utils';

interface TodoCalendarCompletedDotsProps {
  completedColorsByDate: CompletedCategoryData;
  day: DayProps['day'];
}

export function TodoCalendarCompletedDots({
  day,
  completedColorsByDate,
}: TodoCalendarCompletedDotsProps) {
  const targetDate = format(day.date, 'yyyy-MM-dd');
  const targetCompletedColors = completedColorsByDate[targetDate];

  if (!targetCompletedColors) return null;

  return (
    <div className="rdp-sub-day-dot-wrapper max-w-6 flex flex-wrap items-center justify-center gap-[2px]">
      {Object.entries(targetCompletedColors).map(
        ([key, value]) =>
          value.completed && (
            <div
              key={key}
              className="w-[3px] h-[3px] rounded-full"
              style={{ backgroundColor: value.color }}
            ></div>
          ),
      )}
    </div>
  );
}
