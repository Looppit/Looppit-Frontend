import { CategoryWithTodosResponse } from '@/domains/home/types';
import dayjs from '@/shared/lib/dayjs';

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

export const getContinuousDays = (dates: Set<string>) => {
  const today = dayjs().format('YYYY-MM-DD');

  if (!dates.has(today)) {
    return 0;
  }

  let count = 0;
  let current = today;

  while (dates.has(current)) {
    count++;
    current = dayjs(current).subtract(1, 'day').format('YYYY-MM-DD');
  }

  return count;
};
