'use client';

import { Category } from '@/domains/category/types';
import { TodoResponse } from '@/domains/home/types';
import SwipeableContainer from '@/shared/ui/swipeable-container';
import { TodoCard } from '@/shared/ui/todo';

type TodoItemListProps = {
  todos: TodoResponse[];
  categoryColor: Category['categoryColor'];
  onLabelClick: (todo: TodoResponse) => void;
  onOpenActions: (todo: TodoResponse) => void;
  onDelete: (todo: TodoResponse) => void;
  onToggle: (todoId: number, checked: boolean) => void;
};

export const TodoItemList = ({
  todos,
  categoryColor,
  onLabelClick,
  onOpenActions,
  onDelete,
  onToggle,
}: TodoItemListProps) => {
  return (
    <TodoCard.ItemGroup>
      {todos.map((todo) => (
        <SwipeableContainer
          key={todo.todoId}
          actions={
            <TodoCard.ActionButton
              onOpenTodoActions={() => onOpenActions(todo)}
              onDeleteTodo={() => onDelete(todo)}
            />
          }
        >
          <TodoCard.Item
            label={todo.title}
            isChecked={todo.completed}
            categoryColor={categoryColor}
            onCheckedChange={(checked) => onToggle(todo.todoId, checked)}
            onLabelClick={() => onLabelClick(todo)}
          />
        </SwipeableContainer>
      ))}
    </TodoCard.ItemGroup>
  );
};
