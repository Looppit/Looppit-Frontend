import type { QueryValue } from '../api/api.types';

export const buildQueryString = (
  params?: Record<string, QueryValue>,
): string => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const withQueryParams = (
  endpoint: string,
  params?: Record<string, QueryValue>,
): string => {
  return `${endpoint}${buildQueryString(params)}`;
};
