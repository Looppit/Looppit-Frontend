import { apiClient } from '@/shared/api/api.client';
import { ApiResponse, ServerFetchOptions } from '@/shared/api/api.types';
import { toRequestHeadersFromOptions } from '@/shared/api/utils';

import {
  CategoryResponse,
  CreateCategoryParams,
  CreateCategoryResponse,
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
): Promise<CreateCategoryResponse> => {
  const response = await apiClient.post<ApiResponse<CreateCategoryResponse>>(
    '/category',
    data,
  );

  return response.result;
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
