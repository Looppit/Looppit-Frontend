'use server';

import { cookies } from 'next/headers';

import { IS_PRODUCTION } from '@/shared/constants';
import { ENV_CONFIG } from './env';

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
    secure = IS_PRODUCTION,
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

type setCookieProps = {
  key: string;
  value: string;
  options: CookieOptions;
};

export const setCookie = async ({ key, value, options }: setCookieProps) => {
  const cookieStore = await cookies();
  const { isProduction } = ENV_CONFIG;

  const { httpOnly, secure, sameSite, maxAge } = options;
  const secureValue = isProduction ? secure : false;

  cookieStore.set(key, value, {
    httpOnly,
    secure: secureValue,
    sameSite,
    maxAge,
  });
};

export const removeCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
