import type { QueryValue } from '@/shared/api/api.types';

export const buildUrl = (
  baseUrl: string,
  pathname: string,
  queryParams?: Record<string, QueryValue>,
): string => {
  const url = new URL(pathname, baseUrl);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

/**
 * URL에서 특정 쿼리 파라미터를 제거한 새로운 URL 문자열을 반환합니다.
 *
 * @param url - 전체 URL 문자열 또는 pathname + query string
 * @param paramNames - 제거할 쿼리 파라미터 이름 (단일 문자열 또는 문자열 배열)
 * @returns 파라미터가 제거된 URL 문자열
 *
 * @example
 * ```ts
 * removeQueryParams('/login?error=123&redirect=/home', 'error')
 * removeQueryParams('/login?error=123&redirect=/home', ['error', 'redirect'])
 * removeQueryParams('https://example.com/path?foo=bar&baz=qux', 'foo')
 * ```
 */
export const removeQueryParams = (
  url: string,
  paramNames: string | string[],
): string => {
  const paramNameArray = Array.isArray(paramNames) ? paramNames : [paramNames];

  if (!url.includes('://')) {
    const [pathname, queryString] = url.split('?');
    const searchParams = new URLSearchParams(queryString);

    paramNameArray.forEach((paramName) => {
      searchParams.delete(paramName);
    });

    const newQueryString = searchParams.toString();
    return newQueryString ? `${pathname}?${newQueryString}` : pathname;
  }

  const urlObj = new URL(url);
  paramNameArray.forEach((paramName) => {
    urlObj.searchParams.delete(paramName);
  });

  return urlObj.toString();
};
