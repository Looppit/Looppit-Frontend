'use server';

import { cookies } from 'next/headers';

import { getProjectConfig } from './env';

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
};

type setCookieProps = {
  key: string;
  value: string;
  options: CookieOptions;
};

export const setCookie = async ({ key, value, options }: setCookieProps) => {
  const cookieStore = await cookies();
  const { isProduction } = getProjectConfig();

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
