'use client';

import { useMemo } from 'react';

import { TodoSectionEventProvider } from '@/domains/home/contexts';
import { useMergedTodos, useTodosAndCategories } from '@/domains/home/hooks';
import { TodoSection } from '@/domains/home/ui/todo-section';
import { dayjs } from '@/shared/lib';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { ConditionalRender } from '@/shared/ui/condition-render';

import { HomeEmpty } from './home-empty';
import { HomeLoading } from './home-loading';

type TodoSectionListContentProps = {
  yearMonth: string;
};
const TodoSectionsContent = ({ yearMonth }: TodoSectionListContentProps) => {
  const { todosData, categories } = useTodosAndCategories(yearMonth);
  const mergedTodos = useMergedTodos(todosData, categories);

  return (
    <ConditionalRender when={mergedTodos.length !== 0} fallback={<HomeEmpty />}>
      <>
        {mergedTodos.map((category) => (
          <TodoSection key={category.categoryId}>
            <TodoSection.Header category={category} />
            <TodoSection.List
              todos={category.todo}
              categoryId={category.categoryId}
              categoryColor={category.categoryColor}
            />
          </TodoSection>
        ))}
      </>
    </ConditionalRender>
  );
};

export const TodoSections = () => {
  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);

  return (
    <QueryErrorBoundary loadingFallback={<HomeLoading />}>
      <TodoSectionEventProvider yearMonth={yearMonth}>
        <TodoSectionsContent yearMonth={yearMonth} />
      </TodoSectionEventProvider>
    </QueryErrorBoundary>
  );
};
