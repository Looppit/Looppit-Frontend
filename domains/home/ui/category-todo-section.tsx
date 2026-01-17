'use client';

import { CategoryTodoApiResponse } from '@/domains/home/types/todo.types';
import { StrictPropsWithChildren } from '@/shared/types';
import { IconButton } from '@/shared/ui/icon-button';
import SwipeableContainer from '@/shared/ui/swipeable-container';
import { TodoItem } from '@/shared/ui/todo/todo-item';
import { TodoItemHeader } from '@/shared/ui/todo/todo-item-header';

const CategoryTodoSectionRoot = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

type CategoryTodoSectionHeaderProps = {
  category: CategoryTodoApiResponse;
  onAddClick?: () => void;
  onLabelClick: () => void;
};

const CategoryTodoSectionHeader = ({
  category,
  onAddClick,
  onLabelClick,
}: CategoryTodoSectionHeaderProps) => {
  const totalCount = category.todo.length;
  const completedCount = category.todo.filter((todo) => todo.completed).length;

  return (
    <TodoItemHeader
      title={category.categoryName}
      color={category.categoryColor}
      icon={category.categoryIconName}
      completedCount={completedCount}
      totalCount={totalCount}
      onTitleClick={onLabelClick}
      onAddClick={onAddClick}
    />
  );
};

type CategoryTodoSectionListProps = {
  todos: CategoryTodoApiResponse['todo'];
  checkedTodos: Record<number, boolean>;
  onLabelClick: () => void;
  onTodoCheckedChange: (todoId: number, checked: boolean) => void;
};

const CategoryTodoSectionList = ({
  todos,
  checkedTodos,
  onLabelClick,
  onTodoCheckedChange,
}: CategoryTodoSectionListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <CategoryTodoSectionItem
          key={todo.todoId}
          todo={todo}
          checkedTodos={checkedTodos}
          onLabelClick={onLabelClick}
          onTodoCheckedChange={onTodoCheckedChange}
        />
      ))}
    </>
  );
};

type CategoryTodoSectionItemProps = {
  todo: CategoryTodoApiResponse['todo'][number];
  checkedTodos: Record<number, boolean>;
  onLabelClick: () => void;
  onTodoCheckedChange: (todoId: number, checked: boolean) => void;
};

const CategoryTodoSectionItem = ({
  todo,
  checkedTodos,
  onLabelClick,
  onTodoCheckedChange,
}: CategoryTodoSectionItemProps) => {
  return (
    <SwipeableContainer actions={<TodoActions />}>
      <TodoItem
        label={todo.title}
        isChecked={checkedTodos[todo.todoId] ?? todo.completed}
        onCheckedChange={(checked) => onTodoCheckedChange(todo.todoId, checked)}
        onLabelClick={onLabelClick}
      />
    </SwipeableContainer>
  );
};

const TodoActions = () => {
  return (
    <div className="shrink-0 w-[130px] flex items-center justify-center gap-2 px-3">
      <IconButton
        icon="ic_more_horiz"
        size="40"
        iconClassName="fill-current"
        className="bg-card-lighter text-secondary"
      />
      <IconButton
        icon="ic_delete"
        size="40"
        iconClassName="fill-current"
        className="bg-destructive text-white"
      />
    </div>
  );
};

export const CategoryTodoSection = Object.assign(CategoryTodoSectionRoot, {
  Header: CategoryTodoSectionHeader,
  List: CategoryTodoSectionList,
  Item: CategoryTodoSectionItem,
});
