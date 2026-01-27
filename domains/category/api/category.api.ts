import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

import { CategoryResponse, CreateCategoryParams } from '../types';

export const getCategories = async (): Promise<CategoryResponse> => {
  const response =
    await apiClient.get<ApiResponse<CategoryResponse>>('/categories');

  return response.result || [];
};

export const createCategory = async (
  data: CreateCategoryParams,
): Promise<void> => {
  await apiClient.post<ApiResponse<void>>('/category', data);
};
