import { SignupRequest, SignupResponse } from '@/domains/signup/types';
import { apiClient } from '@/shared/api/api.client';

export const postSignupRequest = async (data: SignupRequest) => {
  const response = await apiClient.post<SignupResponse>('/user/signup', data);

  return response;
};
