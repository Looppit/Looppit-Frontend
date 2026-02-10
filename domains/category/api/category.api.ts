import { apiClient } from '@/shared/api/api.client';
import { ApiResponse, ServerFetchOptions } from '@/shared/api/api.types';
import { toRequestHeadersFromOptions } from '@/shared/api/utils';

import {
  CategoryResponse,
  CreateCategoryParams,
  UpdateCategoryParams,
} from '../types';

export const getCategories = async (
  options?: ServerFetchOptions,
): Promise<CategoryResponse> => {
  const headers = toRequestHeadersFromOptions(options);
  const response = await apiClient.get<ApiResponse<CategoryResponse>>(
    '/categories',
    headers,
  );

  return response.result || [];
};

export const createCategory = async (
  data: CreateCategoryParams,
): Promise<void> => {
  await apiClient.post<ApiResponse<void>>('/category', data);
};

export const updateCategory = async ({
  categoryId,
  data,
}: UpdateCategoryParams): Promise<void> => {
  await apiClient.put<ApiResponse<void>>(`/category/${categoryId}`, data);
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>(`/category/${categoryId}`);
};
