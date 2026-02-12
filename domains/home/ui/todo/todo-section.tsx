'use client';

import { useMemo } from 'react';

import { Category } from '@/domains/category/types';
import { useTodoSection } from '@/domains/home/hooks';
import { TodoResponse } from '@/domains/home/types';
import { TodoCard } from '@/shared/ui/todo';
import { getGradient } from '@/shared/utils';

import { TodoItemList } from './todo-item-list';
import { calculateProgress } from './todo-section.utils';

type TodoSectionProps = {
  categoryId: number;
  todos: TodoResponse[];
} & Pick<Category, 'categoryColor' | 'categoryIconName' | 'categoryName'>;

export const TodoSection = ({
  categoryId,
  categoryColor,
  categoryName,
  categoryIconName,
  todos,
}: TodoSectionProps) => {
  const handlers = useTodoSection({ categoryId });
  const progressValue = useMemo(() => calculateProgress(todos), [todos]);
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  return (
    <TodoCard>
      <TodoCard.Header>
        <TodoCard.CategoryTitle
          title={categoryName}
          color={categoryColor}
          icon={categoryIconName}
          onTitleClick={handlers.onTitleClick}
        />
        <TodoCard.Count
          completedCount={completedCount}
          totalCount={todos.length}
        />
        <TodoCard.AddButton
          onAddClick={handlers.onAddClick}
          color={categoryColor}
        />
      </TodoCard.Header>
      <TodoCard.Progress
        value={progressValue}
        bgColor={getGradient(categoryColor)}
      />
      <TodoItemList
        todos={todos}
        categoryColor={categoryColor}
        onLabelClick={handlers.onLabelClick}
        onOpenActions={handlers.onOpenActions}
        onDelete={handlers.onDelete}
        onToggle={handlers.onToggle}
      />
    </TodoCard>
  );
};
