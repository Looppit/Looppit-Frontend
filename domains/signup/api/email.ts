import { apiClient } from '@/shared/api/api.client';
import { withQueryParams } from '@/shared/utils';

import {
  EmailSendRequest,
  EmailSendResponse,
  EmailCertifyRequest,
  EmailCertifyResponse,
} from '../types';

export const postEmailSendRequest = async (data: EmailSendRequest) => {
  const endpoint = withQueryParams('/email/send', { email: data.email });
  const response = await apiClient.post<EmailSendResponse>(endpoint);

  return response;
};

export const postEmailCertifyRequest = async (data: EmailCertifyRequest) => {
  const endpoint = withQueryParams('/email/certification', {
    email: data.email,
    code: data.code,
  });
  const response = await apiClient.post<EmailCertifyResponse>(endpoint, data);

  return response;
};
