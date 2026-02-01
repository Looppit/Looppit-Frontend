'use client';

import { useState } from 'react';

import { format } from 'date-fns';

import {
  HabitStreakCard,
  HomeSheets,
  TodoSections,
  UserGreeting,
} from '@/domains/home/ui';

import { CalendarSection } from './ui/calendar-section';

export const HomeScreen = () => {
  const [todoDate, setTodoDate] = useState<Date>(new Date());
  const todoYearMonth = format(todoDate, 'yyyy-MM');

  return (
    <div className="pt-9 px-5 min-h-screen flex flex-col gap-5">
      <UserGreeting />
      <HabitStreakCard />
      <CalendarSection
        todoYearMonth={todoYearMonth}
        selectedDate={todoDate}
        setSelectedDate={setTodoDate}
      />
      <TodoSections />
      <HomeSheets />
    </div>
  );
};
