import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { QueryValue } from '@/shared/api/api.types';

/**
 * 쿼리 파라미터를 추가/설정한 새로운 URLSearchParams를 반환합니다.
 * null, undefined 값은 무시됩니다.
 * 원본 searchParams는 변경되지 않습니다.
 *
 * @example
 * ```ts
 * const newParams = withSearchParams(searchParams, { email, providerId, provider });
 * ```
 */
export const withSearchParams = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  params: Record<string, QueryValue>,
): URLSearchParams => {
  const newParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newParams.set(key, String(value));
    }
  });

  return newParams;
};

/**
 * 쿼리 파라미터를 제거한 새로운 URLSearchParams를 반환합니다.
 * 원본 searchParams는 변경되지 않습니다.
 *
 * @example
 * ```ts
 * const newParams = withoutSearchParams(searchParams, 'error');
 * const newParams = withoutSearchParams(searchParams, ['error', 'redirect']);
 * ```
 */
export const withoutSearchParams = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  keys: string | string[],
): URLSearchParams => {
  const newParams = new URLSearchParams(searchParams.toString());
  const keyArray = Array.isArray(keys) ? keys : [keys];

  keyArray.forEach((key) => newParams.delete(key));

  return newParams;
};

/**
 * pathname과 쿼리 파라미터를 조합하여 URL 문자열을 생성합니다.
 * URLSearchParams 또는 params 객체를 받을 수 있습니다.
 * 쿼리 파라미터가 없으면 pathname만 반환합니다.
 *
 * @example
 * ```ts
 * joinPathWithQuery('/landing', searchParams) // '/landing?foo=bar'
 * joinPathWithQuery('/email/send', { email: 'test@test.com' }) // '/email/send?email=test%40test.com'
 * ```
 */
export const joinPathWithQuery = (
  pathname: string,
  params: URLSearchParams | Record<string, QueryValue>,
): string => {
  const searchParams =
    params instanceof URLSearchParams
      ? params
      : withSearchParams(new URLSearchParams(), params);

  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
};
