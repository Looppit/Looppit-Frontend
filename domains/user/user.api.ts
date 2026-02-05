import { apiClient } from '@/shared/api/api.client';
import { ServerFetchOptions } from '@/shared/api/api.types';
import { toRequestHeadersFromOptions } from '@/shared/api/utils';

import {
  UpdateUserRequest,
  GetUserResponse,
  DeleteUserRequest,
} from './user.types';

export const getUser = async (options?: ServerFetchOptions) => {
  const headers = toRequestHeadersFromOptions(options);
  return await apiClient.get<GetUserResponse>('/user', headers);
};

export const updateUser = async (data: UpdateUserRequest) => {
  return await apiClient.put<GetUserResponse>('/user', data);
};

export const deleteUser = async (data: DeleteUserRequest) => {
  return await apiClient.delete<void>('/user', data);
};
