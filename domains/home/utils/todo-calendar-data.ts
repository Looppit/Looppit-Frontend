import { CategoryColor } from '@/domains/category/constants';

import { CategoryWithTodosResponse } from '../types';

type CategoryColorInfo = Record<
  string,
  {
    color: CategoryColor;
    completed: boolean;
  }
>;
export type CompletedCategoryData = Record<string, CategoryColorInfo>;

/**
 * todo 데이터 속에 있는 날짜별로 완료된 카테고리 색상 정보를 반환합니다.
 */
export const getCompletedCategoryData = (
  todos: CategoryWithTodosResponse[],
): CompletedCategoryData => {
  const completedCategoryData: CompletedCategoryData = {};

  todos.forEach(({ categoryId, categoryColor, todo }) => {
    const categoryKey = String(categoryId);
    todo.forEach(({ date, completed }) => {
      const byDate = (completedCategoryData[date] ||= {});
      const entry = (byDate[categoryKey] ||= {
        color: categoryColor,
        completed: true,
      });
      if (!entry.completed) return;
      entry.completed = completed;
    });
  });

  return completedCategoryData;
};
