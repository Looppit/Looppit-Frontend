import { Category } from '@/domains/category/types';

export interface TodoApiResponse {
  todoId: number;
  title: string;
  date: string;
  completed: boolean;
}

type TodoData = {
  title: string;
  date: string;
};

export interface CategoryTodoApiResponse extends Pick<
  Category,
  'categoryName' | 'categoryIconName' | 'categoryColor'
> {
  categoryId: number;
  todo: TodoApiResponse[];
}

export interface CreateCategoryTodoApiRequest {
  categoryId: number;
  data: TodoData;
}

export interface ToggleTodoApiRequest {
  categoryId: number;
  todoId: number;
  completed: boolean;
}

export interface UpdateTodoApiRequest {
  categoryId: number;
  todoId: number;
  data: TodoData & {
    updateCategory: number;
  };
}
