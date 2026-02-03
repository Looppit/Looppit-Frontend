import { useMemo } from 'react';

import { format } from 'date-fns';

import { Category } from '@/domains/category/types';
import { CategoryWithTodosResponse } from '@/domains/home/types';

/**
 * 투두 데이터(todosData)에 없는 카테고리도 화면에 노출되도록,
 * 카테고리 정보를 기반으로 비어있는 투두 리스트를 추가하여 병합합니다.
 * 선택한 날짜(todoDate)와 같은 날짜의 투두만 노출합니다.
 *
 * @param todosData 서버에서 받아온 투두 데이터 (카테고리별, 월 단위)
 * @param categories 전체 카테고리 리스트
 * @param selectedDate 선택된 날짜
 * @returns 각 카테고리별 투두(해당 날짜만 필터됨, 없는 카테고리는 빈 배열)
 */
export const useTodoSectionsByDate = (
  todosData: CategoryWithTodosResponse[],
  categories: Category[],
  selectedDate: Date,
) => {
  return useMemo(() => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const categoryIdsInData = new Set(todosData.map((item) => item.categoryId));

    const sectionsFilteredByDate = todosData.map((item) => ({
      ...item,
      todo: item.todo.filter((t) => t.date === selectedDateStr),
    }));
    const categoriesNotInData = categories.filter(
      (category) => !categoryIdsInData.has(category.id),
    );
    const sectionsForMissingCategories = categoriesNotInData.map(
      (category) => ({
        ...category,
        categoryId: category.id,
        todo: [],
      }),
    );

    return [...sectionsFilteredByDate, ...sectionsForMissingCategories];
  }, [todosData, categories, selectedDate]);
};
