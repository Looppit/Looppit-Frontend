'use client';

import { useTodoSectionEvents } from '@/domains/home/contexts';
import {
  TodoSectionHeaderProps,
  TodoSectionItemProps,
  TodoSectionListProps,
  TodoActionsProps,
} from '@/domains/home/types';
import { StrictPropsWithChildren } from '@/shared/types';
import { IconButton } from '@/shared/ui/icon-button';
import SwipeableContainer from '@/shared/ui/swipeable-container';
import { TodoItem } from '@/shared/ui/todo/todo-item';
import { TodoItemHeader } from '@/shared/ui/todo/todo-item-header';

const TodoSectionRoot = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const TodoSectionHeader = ({ category }: TodoSectionHeaderProps) => {
  const { onAddClick, onTitleClick } = useTodoSectionEvents();
  const totalCount = category.todo.length;
  const completedCount = category.todo.filter((todo) => todo.completed).length;

  return (
    <TodoItemHeader
      title={category.categoryName}
      color={category.categoryColor}
      icon={category.categoryIconName}
      completedCount={completedCount}
      totalCount={totalCount}
      onTitleClick={() => onTitleClick(category.categoryId)}
      onAddClick={() => onAddClick(category.categoryId)}
    />
  );
};

const TodoSectionList = ({
  todos,
  categoryId,
  categoryColor,
}: TodoSectionListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoSectionItem
          key={todo.todoId}
          todo={todo}
          categoryId={categoryId}
          categoryColor={categoryColor}
        />
      ))}
    </>
  );
};

const TodoSectionItem = ({
  todo,
  categoryId,
  categoryColor,
}: TodoSectionItemProps) => {
  const { onLabelClick, onOpenTodoActions, onDeleteTodo, onTodoCheckedChange } =
    useTodoSectionEvents();

  return (
    <SwipeableContainer
      actions={
        <TodoActions
          onOpenTodoActions={() => onOpenTodoActions({ todo, categoryId })}
          onDeleteTodo={() => onDeleteTodo({ todo, categoryId })}
        />
      }
    >
      <TodoItem
        label={todo.title}
        isChecked={todo.completed}
        categoryColor={categoryColor}
        onCheckedChange={(checked) =>
          onTodoCheckedChange(categoryId, todo.todoId, checked)
        }
        onLabelClick={() => onLabelClick({ todo, categoryId })}
      />
    </SwipeableContainer>
  );
};

const TodoActions = ({ onOpenTodoActions, onDeleteTodo }: TodoActionsProps) => {
  return (
    <div className="shrink-0 w-[130px] flex items-center justify-center gap-2 px-3">
      <IconButton
        icon="ic_more_horiz"
        size="40"
        iconClassName="fill-current"
        className="bg-card-lighter text-secondary"
        onClick={onOpenTodoActions}
      />
      <IconButton
        icon="ic_delete"
        size="40"
        iconClassName="fill-current"
        className="bg-destructive text-white"
        onClick={onDeleteTodo}
      />
    </div>
  );
};

export const TodoSection = Object.assign(TodoSectionRoot, {
  Header: TodoSectionHeader,
  List: TodoSectionList,
  Item: TodoSectionItem,
});
