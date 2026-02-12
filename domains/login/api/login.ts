'use server';

import { apiServerClient } from '@/shared/api/api.server-client';
import type { ApiError } from '@/shared/api/api.types';
import { applySetCookieHeader } from '@/shared/utils';

export const postLogin = async (
  formData: FormData,
): Promise<void | ApiError> => {
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
  } catch (error) {
    return error as ApiError;
  }
};
