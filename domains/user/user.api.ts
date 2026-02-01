import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

import { UserProfileResponse } from './user.types';

export const getUserProfile = async () => {
  const response =
    await apiClient.get<ApiResponse<UserProfileResponse>>('/user');
  return response.result;
};
