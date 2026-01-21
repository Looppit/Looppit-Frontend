import { dayjs } from '@/shared/lib';

import { TodoResponse } from '../types/todo.types';

type GetInitialFormValuesParams = {
  initialTodo?: TodoResponse & { categoryId?: number };
  initialCategoryId?: number | null;
};

export type InitialFormValues = {
  categoryId: number | null;
  originalCategoryId: number | null;
  todoText: string;
  selectedDate: string;
};

export const getInitialFormValues = ({
  initialTodo,
  initialCategoryId,
}: GetInitialFormValuesParams): InitialFormValues => {
  const categoryId = initialCategoryId ?? null;

  return {
    categoryId,
    originalCategoryId: categoryId,
    todoText: initialTodo?.title ?? '',
    selectedDate: initialTodo?.date
      ? dayjs(initialTodo.date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
  };
};
