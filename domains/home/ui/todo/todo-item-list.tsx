'use client';

import { useTodoSectionEvents } from '@/domains/home/contexts';
import { TodoResponse } from '@/domains/home/types';
import SwipeableContainer from '@/shared/ui/swipeable-container';
import { TodoCard } from '@/shared/ui/todo';

type TodoItemListProps = {
  todos: TodoResponse[];
  categoryId: number;
  categoryColor: string;
};

export const TodoItemList = ({
  todos,
  categoryId,
  categoryColor,
}: TodoItemListProps) => {
  const { onLabelClick, onOpenTodoActions, onDeleteTodo, onTodoCheckedChange } =
    useTodoSectionEvents();

  return (
    <TodoCard.ItemGroup>
      {todos.map((todo) => (
        <SwipeableContainer
          key={todo.todoId}
          actions={
            <TodoCard.ActionButton
              onOpenTodoActions={() => onOpenTodoActions({ todo, categoryId })}
              onDeleteTodo={() => onDeleteTodo({ todo, categoryId })}
            />
          }
        >
          <TodoCard.Item
            label={todo.title}
            isChecked={todo.completed}
            categoryColor={categoryColor}
            onCheckedChange={(checked) =>
              onTodoCheckedChange(categoryId, todo.todoId, checked)
            }
            onLabelClick={() => onLabelClick({ todo, categoryId })}
          />
        </SwipeableContainer>
      ))}
    </TodoCard.ItemGroup>
  );
};
