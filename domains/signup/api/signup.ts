import { SignupRequest, SignupResponse } from '@/domains/signup/types';
import { apiClient } from '@/shared/api/api.client';
import { ApiResponse } from '@/shared/api/api.types';

export const postSignupRequest = async (data: SignupRequest) => {
  await apiClient.post<ApiResponse<SignupResponse>>('/user/signup', data);
};
