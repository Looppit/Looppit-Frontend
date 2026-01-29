import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>(`/category/${categoryId}`);
};
