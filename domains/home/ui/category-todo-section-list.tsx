'use client';

import { useMemo } from 'react';

import { useCategories } from '@/domains/category/hooks';
import { CategoryTodoSectionEventProvider } from '@/domains/home/contexts/category-todo-section.context';
import { useMergedTodos, useTodos } from '@/domains/home/hooks';
import { useCategoryTodoSectionEvents } from '@/domains/home/hooks/use-category-todo-section-events';
import { dayjs } from '@/shared/lib';
import { ConditionalRender } from '@/shared/ui/condition-render';

import { CategoryTodoSection } from './category-todo-section';
import { HomeEmpty } from './home-empty';
import { HomeLoading } from './home-loading';

export const CategoryTodoSectionList = () => {
  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const { data: todosData = [], isPending: isTodosPending } =
    useTodos(yearMonth);
  const { data: categories = [], isPending: isCategoriesPending } =
    useCategories();
  const mergedTodos = useMergedTodos(todosData, categories);

  const events = useCategoryTodoSectionEvents({ yearMonth });

  const isLoading = isTodosPending || isCategoriesPending;

  const conditionProps = useMemo(() => {
    return {
      when: !isLoading && mergedTodos.length !== 0,
      fallback: isLoading ? <HomeLoading /> : <HomeEmpty />,
    };
  }, [isLoading, mergedTodos.length]);

  return (
    <ConditionalRender {...conditionProps}>
      <CategoryTodoSectionEventProvider handlers={events}>
        {mergedTodos.map((category) => (
          <CategoryTodoSection key={category.categoryId}>
            <CategoryTodoSection.Header category={category} />
            <CategoryTodoSection.List
              todos={category.todo}
              categoryId={category.categoryId}
              categoryColor={category.categoryColor}
            />
          </CategoryTodoSection>
        ))}
      </CategoryTodoSectionEventProvider>
    </ConditionalRender>
  );
};
