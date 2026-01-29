import { dayjs } from '@/shared/lib';

import { TodoResponse } from '../types/todo.types';

type GetInitialFormValuesParams = {
  initialTodo?: TodoResponse & { categoryId?: number };
  initialCategoryId?: number | null;
};

type InitialFormValues = {
  categoryId: number | null;
  title: string;
  date: string;
};

export const getInitialFormValues = ({
  initialTodo,
  initialCategoryId,
}: GetInitialFormValuesParams): InitialFormValues => {
  const categoryId = initialCategoryId ?? null;

  return {
    categoryId,
    title: initialTodo?.title ?? '',
    date: initialTodo?.date
      ? dayjs(initialTodo.date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
  };
};
