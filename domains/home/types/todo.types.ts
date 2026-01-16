import { Dayjs } from 'dayjs';

export interface TodoApiResponse {
  todoId: number;
  title: string;
  date: Dayjs;
  completed: boolean;
}

export interface CategoryTodoApiResponse {
  categoryId: number;
  categoryName: string;
  tier: string;
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
