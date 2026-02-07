import { apiClient } from '@/shared/api/api.client';
import { ApiResponse, ServerFetchOptions } from '@/shared/api/api.types';
import { toRequestHeadersFromOptions } from '@/shared/api/utils';
import { joinPathWithQuery } from '@/shared/utils';

import {
  CategoryWithTodosResponse,
  CreateTodoParams,
  DeleteTodoParams,
  TodoResponse,
  ToggleTodoParams,
  UpdateTodoParams,
} from '../types/todo.types';

export const getTodos = async (
  yearMonth: string | null,
  options?: ServerFetchOptions,
): Promise<CategoryWithTodosResponse[]> => {
  const endpoint = joinPathWithQuery('/todos', { yearMonth });
  const headers = toRequestHeadersFromOptions(options);
  const response = await apiClient.get<
    ApiResponse<CategoryWithTodosResponse[]>
  >(endpoint, headers);

  return response.result ?? [];
};

export const createTodo = async ({
  categoryId,
  data,
}: CreateTodoParams): Promise<void> => {
  await apiClient.post<ApiResponse<TodoResponse>>(
    `/categories/${categoryId}`,
    data,
  );
};

export const toggleTodoDone = async ({
  categoryId,
  todoId,
  completed,
}: ToggleTodoParams): Promise<void> => {
  const endpoint = `categories/${categoryId}/todos/${todoId}/${
    completed ? 'done' : 'cancel'
  }`;
  await apiClient.patch<ApiResponse<void>>(endpoint);
};

export const updateTodo = async ({
  categoryId,
  todoId,
  data,
}: UpdateTodoParams): Promise<void> => {
  await apiClient.put<ApiResponse<void>>(
    `/categories/${categoryId}/todos/${todoId}`,
    data,
  );
};

export const deleteTodo = async ({
  categoryId,
  todoId,
}: DeleteTodoParams): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>(
    `/categories/${categoryId}/todos/${todoId}`,
  );
};
