import { useMemo } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { TodoCalendar } from '@/domains/todo/ui';

import { useTodosByDate } from '../hooks';
import { todoDateAtom, todoYearMonthAtom } from '../store';
import { getCompletedCategoryData } from '../utils';
import { MonthlyCalendarSheet } from './sheets';

export const CalendarSection = () => {
  const todoYearMonth = useAtomValue(todoYearMonthAtom);
  const selectedDate = useAtomValue(todoDateAtom);
  const setSelectedDate = useSetAtom(todoDateAtom);

  const { data: todos } = useTodosByDate(todoYearMonth);
  const completedCategoryData = useMemo(() => {
    if (!todos) return {};
    return getCompletedCategoryData(todos);
  }, [todos]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="relative">
      <TodoCalendar
        mode="single"
        type="weekly"
        selected={new Date(selectedDate)}
        onSelect={handleSelect}
        completedColors={completedCategoryData}
      />
      <MonthlyCalendarSheet
        selectedDate={selectedDate}
        onSelect={handleSelect}
        completedCategoryData={completedCategoryData}
      />
    </div>
  );
};
