import { useState } from 'react';

import { addWeeks, isSameWeek, startOfWeek, subWeeks } from 'date-fns';

export const useWeeklyCalendar = () => {
  const [month, setMonth] = useState<Date>(new Date());

  // 주 단위일 때 현재 표시되는 주를 인덱스로 반환
  const currentWeekStart = startOfWeek(month);

  // 현재 주가 아닌 날짜들을 식별하는 modifier (주 단위 숨김을 위해 사용)
  const isNotCurrentWeek = (date: Date) => {
    return !isSameWeek(date, currentWeekStart);
  };

  const onClickPreviousWeek = () => {
    setMonth(startOfWeek(subWeeks(month, 1)));
  };

  const onClickNextWeek = () => {
    setMonth(startOfWeek(addWeeks(month, 1)));
  };

  return {
    isNotCurrentWeek,
    onClickPreviousWeek,
    onClickNextWeek,
    month,
    setMonth,
  };
};
