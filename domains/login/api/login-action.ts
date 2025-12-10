'use server';

import { cookies } from 'next/headers';

import { ApiError } from '@/shared/api/api.types';

import { LoginResponse } from '../types';

export const loginAction = async (
  formData: FormData,
): Promise<LoginResponse | ApiError | null> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/user/login',
      {
        method: 'POST',
        body: formData,
      },
    );

    const data: LoginResponse = await response.json();
    await setTokensToCookies(data);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return {
        code: 'HTTP_500',
        message: error.message,
        field: undefined,
      };
    }

    throw error;
  }
};

const setTokensToCookies = async (data: LoginResponse) => {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5,
  });
  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
};
