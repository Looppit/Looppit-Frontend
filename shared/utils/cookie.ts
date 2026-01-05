'use server';

import { cookies } from 'next/headers';

import { PROJECT_ENV } from '@/shared/constants';

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
  path?: string;
};

export const setCookie = async (
  name: string,
  value: string,
  options?: CookieOptions,
) => {
  const cookieStore = await cookies();

  const {
    httpOnly = true,
    secure = PROJECT_ENV.isProduction,
    sameSite = 'lax',
    maxAge,
    path = '/',
  } = options || {};

  cookieStore.set(name, value, {
    httpOnly,
    secure,
    sameSite,
    maxAge,
    path,
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
