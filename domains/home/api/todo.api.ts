import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';
import { joinPathWithQuery } from '@/shared/utils';

import {
  CategoryTodoApiResponse,
  CreateCategoryTodoApiRequest,
  TodoApiResponse,
  ToggleTodoApiRequest,
  UpdateTodoApiRequest,
} from '../types/todo.types';

export const getTodos = async (
  yearMonth: string,
): Promise<CategoryTodoApiResponse[]> => {
  const endpoint = joinPathWithQuery('/todos', { yearMonth });
  const response =
    await apiClient.get<ApiResponse<CategoryTodoApiResponse[]>>(endpoint);

  return response.result ?? [];
};

export const createTodo = async ({
  categoryId,
  data,
}: CreateCategoryTodoApiRequest): Promise<void> => {
  await apiClient.post<ApiResponse<TodoApiResponse>>(
    `/categories/${categoryId}`,
    data,
  );
};

export const toggleTodoDone = async ({
  categoryId,
  todoId,
  completed,
}: ToggleTodoApiRequest): Promise<void> => {
  const endpoint = `categories/${categoryId}/todos/${todoId}/${
    completed ? 'done' : 'cancel'
  }`;
  await apiClient.patch<ApiResponse<void>>(endpoint);
};

export const updateTodo = async ({
  categoryId,
  todoId,
  data,
}: UpdateTodoApiRequest): Promise<void> => {
  await apiClient.put<ApiResponse<void>>(
    `/categories/${categoryId}/todos/${todoId}`,
    data,
  );
};
