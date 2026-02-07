import { useMemo } from 'react';

import { useTodosByDate } from './queries';
import { getCompletedCategoryData } from '../utils';

interface UseGetCalendarSectionDataProps {
  calendarYearMonth: string;
}

/**
 * CalendSection 컴포넌트에 필요한 데이터들을 호출하고, 각 데이터들을 가공하여 반환합니다.
 * @param calendarYearMonth 캘린더 섹션에 표시되는 month 및 todoYaerMonthAtom에 의존하는 값. 해당 값을 기준으로 calendar의 todo 데이터들을 불러옵니다.
 * @returns
 */
export const useGetCalendarSectionData = ({
  calendarYearMonth,
}: UseGetCalendarSectionDataProps) => {
  const { data: todos } = useTodosByDate(calendarYearMonth);

  const completedCategoryData = useMemo(() => {
    if (!todos) return {};
    return getCompletedCategoryData(todos);
  }, [todos]);

  return {
    completedCategoryData,
  };
};
