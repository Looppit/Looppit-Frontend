import { format, parseISO } from 'date-fns';

import { TodoResponse } from '../types/todo.types';

type GetInitialFormValuesParams = {
  initialTodo?: TodoResponse & { categoryId?: number };
  initialCategoryId?: number | null;
  /** 생성 모드일 때 폼 초기 날짜로 사용 (미지정 시 오늘) */
  initialSelectedDate?: Date;
};

type InitialFormValues = {
  categoryId: number | null;
  title: string;
  date: string;
};

export const getInitialFormValues = ({
  initialTodo,
  initialCategoryId,
  initialSelectedDate,
}: GetInitialFormValuesParams): InitialFormValues => {
  const categoryId = initialCategoryId ?? null;
  const date = initialTodo?.date
    ? format(parseISO(initialTodo.date), 'yyyy-MM-dd')
    : initialSelectedDate
      ? format(initialSelectedDate, 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd');

  return {
    categoryId,
    title: initialTodo?.title ?? '',
    date,
  };
};
