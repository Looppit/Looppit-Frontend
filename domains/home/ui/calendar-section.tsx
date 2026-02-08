import { useState } from 'react';

import { format } from 'date-fns';
import { useAtom, useAtomValue } from 'jotai';

import { TodoCalendar } from '@/domains/todo/ui';

import { MonthlyCalendarSheet } from './sheets';
import { useGetCalendarSectionData } from '../hooks';
import { todoDateAtom, todoYearMonthAtom } from '../store';

export const CalendarSection = () => {
  const todoYearMonth = useAtomValue(todoYearMonthAtom);
  const [selectedDate, setSelectedDate] = useAtom(todoDateAtom);

  // 날짜 선택을 하지 않고, 네비게이션 변경을 하더라도 그 달에 해당하는 데이터를 보여주기 위해 날짜 상태 관리 추가
  const [calendarYearMonth, setCalendarYearMonth] = useState(todoYearMonth);
  const { completedCategoryData } = useGetCalendarSectionData({
    selectedDate,
    calendarYearMonth,
  });

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setCalendarYearMonth(format(date, 'yyyy-MM'));
    }
  };

  const handleNavigate = (date: Date) => {
    setCalendarYearMonth(format(date, 'yyyy-MM'));
  };

  return (
    <div className="relative">
      <TodoCalendar
        mode="single"
        type="weekly"
        selected={new Date(selectedDate)}
        onSelect={handleSelect}
        onNavigate={handleNavigate}
        completedColors={completedCategoryData}
      />
      <MonthlyCalendarSheet
        selectedDate={selectedDate}
        onSelect={handleSelect}
        completedCategoryData={completedCategoryData}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
