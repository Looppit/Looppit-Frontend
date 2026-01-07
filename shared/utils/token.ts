import { deleteCookie, setCookie } from '@/shared/utils';

export const setAccessTokenToCookie = async (accessToken: string) => {
  await setCookie('accessToken', accessToken, {
    maxAge: 60 * 5,
  });
};

export const setRefreshTokenToCookie = async (refreshToken: string) => {
  await setCookie('refreshToken', refreshToken, {
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

export const removeTokensFromCookies = async () => {
  await deleteCookie('accessToken');
  await deleteCookie('refreshToken');
};
