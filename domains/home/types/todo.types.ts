import { Dayjs } from 'dayjs';

import { Category } from '@/domains/category/types';

export interface TodoApiResponse {
  todoId: number;
  title: string;
  date: Dayjs;
  completed: boolean;
}

export interface CategoryTodoApiResponse extends Pick<
  Category,
  'categoryName' | 'categoryIconName' | 'categoryColor'
> {
  categoryId: number;
  todo: TodoApiResponse[];
}

export interface CreateCategoryTodoApiRequest {
  categoryId: number;
  data: {
    title: string;
    level: string;
    date: Dayjs;
    content: string;
  };
}
