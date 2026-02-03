import { format, parseISO, subDays } from 'date-fns';

import { CategoryWithTodosResponse } from '@/domains/home/types';

export const updateTodoInCategory = (
  categories: CategoryWithTodosResponse[],
  categoryId: number,
  todoId: number,
  completed: boolean,
): CategoryWithTodosResponse[] => {
  return categories.map((category) => {
    if (category.categoryId !== categoryId) {
      return category;
    }

    return {
      ...category,
      todo: category.todo.map((todo) =>
        todo.todoId === todoId ? { ...todo, completed } : todo,
      ),
    };
  });
};

export const getCompletedTodoDates = (
  categories: CategoryWithTodosResponse[],
): Set<string> => {
  return new Set(
    categories.flatMap((category) =>
      category.todo.filter((todo) => todo.completed).map((todo) => todo.date),
    ),
  );
};

/**
 * 오늘부터 과거로 이어지는 연속 일수를 계산합니다.
 * @param dates 완료(completed)된 날짜만 담긴 Set (yyyy-MM-dd). 호출측에서 completed인 투두의 날짜만 넣어야 합니다.
 */
export const getContinuousDays = (dates: Set<string>) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  if (!dates.has(today)) {
    return 0;
  }

  let count = 0;
  let current = today;

  while (dates.has(current)) {
    count++;
    current = format(subDays(parseISO(current), 1), 'yyyy-MM-dd');
  }

  return count;
};
