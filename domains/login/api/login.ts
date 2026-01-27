'use server';

import { apiServerClient } from '@/shared/api/api.server-client';
import {
  createApiError,
  createApiResponse,
} from '@/shared/api/utils/api.response-format';
import { applySetCookieHeader } from '@/shared/utils';

export const postLogin = async (formData: FormData) => {
  try {
    const response = await apiServerClient.requestRaw('/user/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const setCookieHeaders = response.headers['set-cookie'];

    if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
      await applySetCookieHeader(setCookieHeaders);
    }

    return createApiResponse(response.data);
  } catch (error) {
    return createApiError(error);
  }
};
