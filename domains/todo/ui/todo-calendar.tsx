'use client';

import { Calendar } from '@/shared/ui/calendar';
import { CalendarProps } from '@/shared/ui/calendar';

import { TodoCalendarCompletedDots } from './todo-calendar-completed-dots';

type TodoCalendarProps = CalendarProps & {
  completedColors: { color: string; id: string }[];
};

function TodoCalendar({
  type = 'monthly',
  completedColors,
  ...props
}: TodoCalendarProps) {
  return (
    <Calendar
      type={type}
      SubDayComponent={<TodoCalendarCompletedDots colors={completedColors} />}
      {...props}
    />
  );
}

export { TodoCalendar };
