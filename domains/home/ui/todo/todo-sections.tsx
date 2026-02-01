'use client';

import { useMergedTodos, useTodosAndCategories } from '@/domains/home/hooks';
import { HomeTodoEmpty, HomeTodoLoading } from '@/domains/home/ui';
import { dayjs } from '@/shared/lib';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { ConditionalRender } from '@/shared/ui/condition-render';

import { TodoSection } from './todo-section';

type TodoSectionListContentProps = {
  yearMonth: string;
};
const TodoSectionsContent = ({ yearMonth }: TodoSectionListContentProps) => {
  const { todosData, categories } = useTodosAndCategories(yearMonth);
  const mergedTodos = useMergedTodos(todosData, categories);

  return (
    <ConditionalRender
      when={mergedTodos.length !== 0}
      fallback={<HomeTodoEmpty />}
    >
      {mergedTodos.map((section) => (
        <TodoSection
          key={section.categoryId}
          categoryId={section.categoryId}
          categoryColor={section.categoryColor}
          categoryName={section.categoryName}
          categoryIconName={section.categoryIconName}
          todos={section.todo}
        />
      ))}
    </ConditionalRender>
  );
};

export const TodoSections = () => {
  const yearMonth = dayjs().format('YYYY-MM');

  return (
    <QueryErrorBoundary loadingFallback={<HomeTodoLoading />}>
      <TodoSectionsContent yearMonth={yearMonth} />
    </QueryErrorBoundary>
  );
};
