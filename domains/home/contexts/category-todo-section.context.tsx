'use client';

import { createContext, useContext, useMemo } from 'react';

import { CategoryTodoSectionHandlers } from '@/domains/home/types/category-todo-section.types';
import { StrictPropsWithChildren } from '@/shared/types';

const CategoryTodoSectionEventContext =
  createContext<CategoryTodoSectionHandlers | null>(null);

export const CategoryTodoSectionEventProvider = ({
  children,
  handlers,
}: StrictPropsWithChildren<{ handlers: CategoryTodoSectionHandlers }>) => {
  const contextValue = useMemo(() => handlers, [handlers]);

  return (
    <CategoryTodoSectionEventContext.Provider value={contextValue}>
      {children}
    </CategoryTodoSectionEventContext.Provider>
  );
};

export const useCategoryTodoSectionEvents = () => {
  const context = useContext(CategoryTodoSectionEventContext);
  if (!context) {
    throw new Error(
      'useCategoryTodoSectionEvents는 CategoryTodoSectionEventProvider 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
