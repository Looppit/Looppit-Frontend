'use server';

import { cookies } from 'next/headers';

import { PROJECT_ENV } from '@/shared/constants';

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
  path?: string;
  expires?: Date;
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
    expires,
  } = options || {};

  cookieStore.set(name, value, {
    httpOnly,
    secure,
    sameSite,
    maxAge,
    path,
    expires,
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

/**
 * Set-Cookie 헤더 문자열 배열을 파싱하여 Next.js cookies() API로 설정합니다.
 *
 * @description
 * HTTP 환경에서 SameSite=None은 작동하지 않으므로 항상 'lax'로 강제합니다.
 * 현재 백엔드에서 SameSite=None으로 보내주고 있어 클라이언트에서 강제 변환합니다.
 *
 * @param setCookieHeaders - 백엔드 응답의 Set-Cookie 헤더 문자열 배열
 */
export const applySetCookieHeader = async (
  setCookieHeaders: string[],
): Promise<void> => {
  for (const cookieStr of setCookieHeaders) {
    const { name, value, options } = parseSetCookieString(cookieStr);
    await setCookie(name, value, options);
  }
};

/**
 * Set-Cookie 헤더 문자열을 파싱하여 이름, 값, 옵션을 반환합니다.
 */
const parseSetCookieString = (
  cookieStr: string,
): { name: string; value: string; options: CookieOptions } => {
  const [nameValue, ...attributes] = cookieStr.split('; ');
  const [name, ...valueParts] = nameValue.split('=');
  const value = valueParts.join('=');

  const options: CookieOptions = {
    sameSite: 'lax',
    secure: PROJECT_ENV.isProduction,
  };

  for (const attr of attributes) {
    const [key, val] = attr.split('=');
    const lowerKey = key.toLowerCase();

    if (lowerKey === 'path') options.path = val;
    if (lowerKey === 'httponly') options.httpOnly = true;
    if (lowerKey === 'max-age') options.maxAge = parseInt(val, 10);
    if (lowerKey === 'expires') options.expires = new Date(val);
  }

  return { name, value, options };
};
