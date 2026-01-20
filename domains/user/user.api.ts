import { apiClient } from '@/shared/api/api.client';

import { UserProfileResponse } from './user.types';

export const getUserProfile = async () => {
  return await apiClient.get<UserProfileResponse>('/user');
};
