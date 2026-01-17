import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

import {
  CategoryApiResponse,
  CreateCategoryRequest,
} from '../types/category.types';

export const getCategories = async (): Promise<CategoryApiResponse[]> => {
  const response =
    await apiClient.get<ApiResponse<CategoryApiResponse[]>>('/categories');

  return response.result || [];
};

export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<void> => {
  await apiClient.post<ApiResponse<CreateCategoryRequest>>('/category', data);
};
