'use server';

import { apiFetch } from '@/shared/api/api.fetch';
import { ApiError } from '@/shared/api/api.types';
import { FetchError } from '@/shared/api/fetch.error';

import { LoginResponse } from '../types';
import { setTokensToCookies } from '../utils';

export const loginAction = async (
  formData: FormData,
): Promise<LoginResponse | ApiError | undefined> => {
  try {
    const data = await apiFetch<LoginResponse>({
      endpoint: '/user/login',
      method: 'POST',
      body: formData,
    });
    await setTokensToCookies(data);

    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      return error.toJSON();
    }

    return new FetchError(500);
  }
};
