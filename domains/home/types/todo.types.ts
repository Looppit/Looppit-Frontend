import { Category } from '@/domains/category/types';

/** API Response Types */
export interface TodoResponse {
  todoId: number;
  title: string;
  date: string;
  completed: boolean;
}

export interface CategoryWithTodosResponse extends Pick<
  Category,
  'categoryName' | 'categoryIconName' | 'categoryColor'
> {
  categoryId: number;
  todo: TodoResponse[];
}

/** API Request Types */
export interface CreateTodoRequest {
  title: string;
  date: string;
}

export interface UpdateTodoRequest {
  title: string;
  date: string;
  updateCategory: number;
}

export interface ToggleTodoParams {
  categoryId: number;
  todoId: number;
  completed: boolean;
}

/** API Function Parameters */
export interface CreateTodoParams {
  categoryId: number;
  data: CreateTodoRequest;
}

export interface UpdateTodoParams {
  categoryId: number;
  todoId: number;
  data: UpdateTodoRequest;
}

export interface DeleteTodoParams {
  categoryId: number;
  todoId: number;
}
