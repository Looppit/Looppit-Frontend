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

export const updateUser = async (data: Partial<UpdateUserRequest>) => {
  return await apiClient.patch<GetUserResponse>('/user', data);
};

export const deleteUser = async (data: DeleteUserRequest) => {
  return await apiClient.request<void>('/user', {
    method: 'DELETE',
    body: data,
  });
};
