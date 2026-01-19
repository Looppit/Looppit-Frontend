'use client';

import { useMemo } from 'react';

import { useCategories } from '@/domains/category/hooks';
import { useTodoFormSheet } from '@/domains/home/contexts';
import { TODO_FORM_MODE } from '@/domains/home/contexts/todo-form-sheet.context';
import { useMergedTodos, useTodos, useToggleTodo } from '@/domains/home/hooks';
import { TodoApiResponse } from '@/domains/home/types/todo.types';
import { useSwipeable } from '@/shared/hooks';
import { dayjs } from '@/shared/lib';
import { ConditionalRender } from '@/shared/ui/condition-render';

import { CategoryTodoSection } from './category-todo-section';
import { HomeEmpty } from './home-empty';
import { HomeLoading } from './home-loading';

export const CategoryTodoSectionList = () => {
  const { openSheet } = useTodoFormSheet();

  const yearMonth = useMemo(() => dayjs().format('YYYY-MM'), []);
  const { data: todosData = [], isPending: isTodosPending } =
    useTodos(yearMonth);
  const { data: categories = [], isPending: isCategoriesPending } =
    useCategories();
  const { isOpened } = useSwipeable();
  const toggleTodoMutation = useToggleTodo(yearMonth);

  const mergedTodos = useMergedTodos(todosData, categories);

  const handleTodoCheckedChange = (
    categoryId: number,
    todoId: number,
    checked: boolean,
  ) => {
    toggleTodoMutation.mutate({ categoryId, todoId, completed: checked });
  };

  const handleAddTodo = (categoryId: number) => {
    openSheet(TODO_FORM_MODE.CREATE, categoryId);
  };

  const handleEditTodo = (todo: TodoApiResponse, categoryId: number) => {
    if (isOpened) return;
    openSheet(TODO_FORM_MODE.EDIT, categoryId, todo);
  };

  const handleTitleClick = () => {};

  const isLoading = isTodosPending || isCategoriesPending;

  return (
    <ConditionalRender
      when={!isLoading && mergedTodos.length !== 0}
      fallback={isLoading ? <HomeLoading /> : <HomeEmpty />}
    >
      {mergedTodos.map((category) => (
        <CategoryTodoSection key={category.categoryId}>
          <CategoryTodoSection.Header
            category={category}
            onAddClick={() => handleAddTodo(category.categoryId)}
            onTitleClick={handleTitleClick}
          />
          <CategoryTodoSection.List
            todos={category.todo}
            categoryId={category.categoryId}
            categoryColor={category.categoryColor}
            onLabelClick={handleEditTodo}
            onTodoCheckedChange={handleTodoCheckedChange}
          />
        </CategoryTodoSection>
      ))}
    </ConditionalRender>
  );
};
