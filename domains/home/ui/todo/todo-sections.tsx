'use client';

import { useAtomValue } from 'jotai';

import {
  useTodoSectionsByDate,
  useTodosAndCategories,
} from '@/domains/home/hooks';
import { todoDateAtom, todoYearMonthAtom } from '@/domains/home/store';
import { HomeTodoEmpty, HomeTodoLoading } from '@/domains/home/ui';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { ConditionalRender } from '@/shared/ui/condition-render';

import { TodoSection } from './todo-section';

type TodoSectionListContentProps = {
  yearMonth: string;
  selectedDate: Date;
};
const TodoSectionsContent = ({
  yearMonth,
  selectedDate,
}: TodoSectionListContentProps) => {
  const { todosData, categories } = useTodosAndCategories(yearMonth);
  const todoSectionsByDate = useTodoSectionsByDate(
    todosData,
    categories,
    selectedDate,
  );

  return (
    <ConditionalRender
      when={todoSectionsByDate.length !== 0}
      fallback={<HomeTodoEmpty />}
    >
      {todoSectionsByDate.map((section) => (
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
  const selectedDate = useAtomValue(todoDateAtom);
  const yearMonth = useAtomValue(todoYearMonthAtom);

  return (
    <QueryErrorBoundary loadingFallback={<HomeTodoLoading />}>
      <TodoSectionsContent yearMonth={yearMonth} selectedDate={selectedDate} />
    </QueryErrorBoundary>
  );
};
