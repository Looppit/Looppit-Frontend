import { z } from 'zod';

import { Category } from '@/domains/category/types';

/** Form Schema */
export const todoFormSchema = z
  .object({
    title: z
      .string()
      .min(1, '할 일을 입력해주세요.')
      .max(100, '할 일은 100자 이하로 입력해주세요.'),
    categoryId: z.number().min(1).nullable(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다.'),
  })
  .refine((data) => data.categoryId !== null, {
    message: '카테고리를 선택해주세요.',
    path: ['categoryId'],
  });

export type TodoFormValues = z.infer<typeof todoFormSchema>;

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
