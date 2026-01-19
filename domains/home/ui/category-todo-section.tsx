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
  onTitleClick: () => void;
};

const CategoryTodoSectionHeader = ({
  category,
  onAddClick,
  onTitleClick,
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
      onTitleClick={onTitleClick}
      onAddClick={onAddClick}
    />
  );
};

type CategoryTodoSectionListProps = {
  todos: CategoryTodoApiResponse['todo'];
  categoryId: number;
  categoryColor: CategoryTodoApiResponse['categoryColor'];
  onLabelClick: (
    todo: CategoryTodoApiResponse['todo'][number],
    categoryId: number,
  ) => void;
  onTodoCheckedChange: (
    categoryId: number,
    todoId: number,
    checked: boolean,
  ) => void;
};

const CategoryTodoSectionList = ({
  todos,
  categoryId,
  onLabelClick,
  categoryColor,
  onTodoCheckedChange,
}: CategoryTodoSectionListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <CategoryTodoSectionItem
          key={todo.todoId}
          todo={todo}
          categoryId={categoryId}
          categoryColor={categoryColor}
          onLabelClick={() => onLabelClick(todo, categoryId)}
          onTodoCheckedChange={onTodoCheckedChange}
        />
      ))}
    </>
  );
};

type CategoryTodoSectionItemProps = {
  todo: CategoryTodoApiResponse['todo'][number];
  categoryId: number;
  categoryColor: CategoryTodoApiResponse['categoryColor'];
  onLabelClick: () => void;
  onTodoCheckedChange: (
    categoryId: number,
    todoId: number,
    checked: boolean,
  ) => void;
};

const CategoryTodoSectionItem = ({
  todo,
  categoryId,
  categoryColor,
  onLabelClick,
  onTodoCheckedChange,
}: CategoryTodoSectionItemProps) => {
  return (
    <SwipeableContainer actions={<TodoActions />}>
      <TodoItem
        label={todo.title}
        isChecked={todo.completed}
        categoryColor={categoryColor}
        onCheckedChange={(checked) =>
          onTodoCheckedChange(categoryId, todo.todoId, checked)
        }
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
