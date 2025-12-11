'use server';

import { cookies } from 'next/headers';

import { getProjectConfig } from './env';

export const setAccessTokenToCookie = async (accessToken: string) => {
  const cookieStore = await cookies();
  const { isProduction } = getProjectConfig();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 5,
  });
};

export const setRefreshTokenToCookie = async (refreshToken: string) => {
  const cookieStore = await cookies();
  const { isProduction } = getProjectConfig();

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const setTokensToCookies = async (data: Tokens) => {
  await setAccessTokenToCookie(data.accessToken);
  await setRefreshTokenToCookie(data.refreshToken);
};
