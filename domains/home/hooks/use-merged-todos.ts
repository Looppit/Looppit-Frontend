import { useMemo } from 'react';

import { Category } from '@/domains/category/types';
import { CategoryTodoApiResponse } from '@/domains/home/types/todo.types';

export const useMergedTodos = (
  todosData: CategoryTodoApiResponse[],
  categories: Category[],
) => {
  return useMemo(() => {
    const todosCategoryIds = new Set(todosData.map((item) => item.categoryId));
    const missingCategories = categories.filter(
      (category) => !todosCategoryIds.has(category.id),
    );

    const missingCategoryTodos: CategoryTodoApiResponse[] =
      missingCategories.map((category) => ({
        categoryId: category.id,
        categoryName: category.categoryName,
        categoryIconName: category.categoryIconName,
        categoryColor: category.categoryColor,
        todo: [],
      }));

    return [...todosData, ...missingCategoryTodos];
  }, [todosData, categories]);
};
