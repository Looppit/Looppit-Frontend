'use client';

import { CalendarProps } from './calendar.type';
import { MonthlyCalendar } from './monthly-calendar';
import { WeeklyCalendar } from './weekly-calendar';

function Calendar({ type = 'monthly', ...props }: CalendarProps) {
  return type === 'monthly' ? (
    <MonthlyCalendar {...props} mode="single" />
  ) : (
    <WeeklyCalendar {...props} mode="single" />
  );
}

export { Calendar };
