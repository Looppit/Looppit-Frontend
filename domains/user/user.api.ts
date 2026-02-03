import { apiClient } from '@/shared/api/api.client';
import { ApiResponse, ServerFetchOptions } from '@/shared/api/api.types';
import { toRequestHeadersFromOptions } from '@/shared/api/utils';

import { UserProfileResponse } from './user.types';

export const getUserProfile = async (
  options?: ServerFetchOptions,
): Promise<UserProfileResponse> => {
  const headers = toRequestHeadersFromOptions(options);
  const response = await apiClient.get<ApiResponse<UserProfileResponse>>(
    '/user',
    headers,
  );
  return response.result;
};
