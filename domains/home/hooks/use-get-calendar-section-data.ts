import { useMemo } from 'react';

import { addMonths, format, subMonths } from 'date-fns';

import { isFirstWeek, isLastWeek } from '@/shared/utils';

import { useTodosByDate } from './queries';
import { getCompletedCategoryData } from '../utils';

interface UseGetCalendarSectionDataProps {
  calendarYearMonth: string;
  selectedDate: Date;
}

/**
 * CalendSection 컴포넌트에 필요한 데이터들을 호출하고, 각 데이터들을 가공하여 반환합니다.
 * @param calendarYearMonth 캘린더 섹션에 표시되는 month 및 todoYaerMonthAtom에 의존하는 값. 해당 값을 기준으로 calendar의 todo 데이터들을 불러옵니다.
 * @returns
 */
export const useGetCalendarSectionData = ({
  calendarYearMonth,
  selectedDate,
}: UseGetCalendarSectionDataProps) => {
  const prevYearMonth = isFirstWeek(selectedDate)
    ? format(subMonths(selectedDate, 1), 'yyyy-MM')
    : null;
  const nextYearMonth = isLastWeek(selectedDate)
    ? format(addMonths(selectedDate, 1), 'yyyy-MM')
    : null;

  const { data: prevMonthTodos = [] } = useTodosByDate(
    prevYearMonth,
    !!prevYearMonth,
  );
  const { data: todos } = useTodosByDate(calendarYearMonth);
  const { data: nextMonthTodos = [] } = useTodosByDate(
    nextYearMonth,
    !!nextYearMonth,
  );

  const completedCategoryData = useMemo(() => {
    if (!todos) return {};
    return getCompletedCategoryData([
      ...prevMonthTodos,
      ...todos,
      ...nextMonthTodos,
    ]);
  }, [prevMonthTodos, todos, nextMonthTodos]);

  return {
    completedCategoryData,
  };
};
