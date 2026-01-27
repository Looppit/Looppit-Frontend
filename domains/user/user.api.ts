import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

import { UpdateUserRequest, UserProfileResponse } from './user.types';

export const getUserProfile = async () => {
  const response =
    await apiClient.get<ApiResponse<UserProfileResponse>>('/user');
  return response.result;
};

export const updateUser = async (data: UpdateUserRequest) => {
  return await apiClient.put<UserProfileResponse>('/user', data);
};
