import { useMemo } from 'react';

import { Category } from '@/domains/category/types';
import { CategoryTodoApiResponse } from '@/domains/home/types/todo.types';

/**
 * 투두 데이터(todosData)에 없는 카테고리도 화면에 노출되도록,
 * 카테고리 정보를 기반으로 비어있는 투두 리스트를 추가하여 병합합니다.
 *
 * @param todosData 서버에서 받아온 투두 데이터 (카테고리별)
 * @param categories 전체 카테고리 리스트
 * @returns 각 카테고리별 투두(투두가 없는 카테고리는 빈 배열)
 */
export const useMergedTodos = (
  todosData: CategoryTodoApiResponse[],
  categories: Category[],
) => {
  return useMemo(() => {
    const todosCategoryIds = new Set(todosData.map((item) => item.categoryId));
    const missingCategories = categories.filter(
      (category) => !todosCategoryIds.has(category.id),
    );

    const missingCategoryTodos = missingCategories.map((category) => ({
      ...category,
      categoryId: category.id,
      todo: [],
    }));

    return [...todosData, ...missingCategoryTodos];
  }, [todosData, categories]);
};
