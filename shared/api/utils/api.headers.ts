import { ServerFetchOptions } from '@/shared/api/api.types';

/** ServerFetchOptions의 cookieHeader를 요청용 headers 객체로 변환 */
export function toRequestHeadersFromOptions(
  options?: ServerFetchOptions,
): Record<string, string> | undefined {
  return options?.cookieHeader ? { Cookie: options.cookieHeader } : undefined;
}
