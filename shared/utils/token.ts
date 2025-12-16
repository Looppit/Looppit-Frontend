import { removeCookie, setCookie } from '@/shared/utils';

export const setAccessTokenToCookie = async (accessToken: string) => {
  await setCookie({
    key: 'accessToken',
    value: accessToken,
    options: {
      maxAge: 60 * 5,
    },
  });
};

export const setRefreshTokenToCookie = async (refreshToken: string) => {
  await setCookie({
    key: 'refreshToken',
    value: refreshToken,
    options: {
      maxAge: 60 * 60 * 24 * 7,
    },
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
  await removeCookie('accessToken');
  await removeCookie('refreshToken');
};
