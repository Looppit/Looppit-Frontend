'use server';

import { SignupRequest } from '@/domains/signup/types';
import { apiServerClient } from '@/shared/api/api.server-client';
import { ApiError } from '@/shared/api/api.types';
import { applySetCookieHeader } from '@/shared/utils';

export const postSignup = async (
  data: SignupRequest,
): Promise<void | ApiError> => {
  try {
    const response = await apiServerClient.requestRaw('/user/signup', {
      method: 'POST',
      body: data,
    });

    const setCookieHeaders = response.headers['set-cookie'];

    if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
      await applySetCookieHeader(setCookieHeaders);
    }
  } catch (error) {
    return error as ApiError;
  }
};
