import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';
import { joinPathWithQuery } from '@/shared/utils';

import {
  CategoryTodoApiResponse,
  CreateCategoryTodoApiRequest,
  TodoApiResponse,
} from '../types/todo.types';

export const getTodos = async (
  yearMonth: string,
): Promise<CategoryTodoApiResponse[]> => {
  const endpoint = joinPathWithQuery('/todos', { yearMonth });
  const response =
    await apiClient.get<ApiResponse<CategoryTodoApiResponse[]>>(endpoint);

  return response.result;
};

export const createTodo = async ({
  categoryId,
  data,
}: CreateCategoryTodoApiRequest) => {
  await apiClient.post<ApiResponse<TodoApiResponse>>(
    `/categories/${categoryId}`,
    data,
  );
};
