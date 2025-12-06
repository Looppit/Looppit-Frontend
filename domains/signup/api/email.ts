import { apiClient } from '@/shared/api/api.client';
import { withQueryParams } from '@/shared/utils';

import { VerifyEmailRequest, VerifyEmailResponse } from '../types';

export const postEmailSendRequest = async (data: VerifyEmailRequest) => {
  const endpoint = withQueryParams('/email/send', { email: data.email });
  const response = await apiClient.post<VerifyEmailResponse>(endpoint);

  return response.data;
};
