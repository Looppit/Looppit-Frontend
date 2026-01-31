import { apiClient } from '@/shared/api/api.client';

import {
  UpdateUserRequest,
  GetUserResponse,
  DeleteUserRequest,
} from './user.types';

export const getUserProfile = async () => {
  return await apiClient.get<GetUserResponse>('/user');
};

export const updateUser = async (data: UpdateUserRequest) => {
  return await apiClient.put<GetUserResponse>('/user', data);
};

export const deleteUser = async (data: DeleteUserRequest) => {
  return await apiClient.delete<void>('/user', data);
};
