'use client';

import { useMemo } from 'react';

import { CategoryColor } from '@/domains/category/constants';
import { useTodoSection } from '@/domains/home/hooks';
import { TodoResponse } from '@/domains/home/types';
import { IconName } from '@/shared/ui/icon';
import { TodoCard } from '@/shared/ui/todo';
import { getGradient } from '@/shared/utils';

import { TodoItemList } from './todo-item-list';
import { calculateProgress } from './todo-section.utils';

type TodoSectionProps = {
  categoryId: number;
  categoryColor: CategoryColor;
  categoryName: string;
  categoryIconName: IconName;
  todos: TodoResponse[];
};

export const TodoSection = ({
  categoryId,
  categoryColor,
  categoryName,
  categoryIconName,
  todos,
}: TodoSectionProps) => {
  const handlers = useTodoSection({ categoryId });
  const progressValue = useMemo(() => calculateProgress(todos), [todos]);

  return (
    <TodoCard>
      <TodoCard.Header
        title={categoryName}
        color={categoryColor}
        icon={categoryIconName}
        onTitleClick={handlers.onTitleClick}
        onAddClick={handlers.onAddClick}
      />
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
