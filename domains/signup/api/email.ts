import { apiClient } from '@/shared/api/api.client';
import { joinPathWithQuery } from '@/shared/utils';

import { EmailSendRequest, EmailCertifyRequest } from '../types';

export const postEmailSendRequest = async (data: EmailSendRequest) => {
  const endpoint = joinPathWithQuery('/email/send', { email: data.email });
  await apiClient.post<void>(endpoint);
};

export const postEmailCertifyRequest = async (data: EmailCertifyRequest) => {
  const endpoint = joinPathWithQuery('/email/certification', {
    email: data.email,
    code: data.code,
  });

  await apiClient.post<void>(endpoint, data);
};
