import { endOfMonth, getWeek, startOfMonth } from 'date-fns';

export function isFirstWeek(date: Date) {
  const firstWeekNumberOfCurrentMonth = getWeek(startOfMonth(date));
  return getWeek(date) === firstWeekNumberOfCurrentMonth;
}

export function isLastWeek(date: Date) {
  const lastWeekNumberOfCurrentMonth = getWeek(endOfMonth(date));
  return getWeek(date) === lastWeekNumberOfCurrentMonth;
}
