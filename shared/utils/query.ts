import { NextRequest } from 'next/server';

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

export const getDecodedSearchParams = (
  request: NextRequest,
  keys: string[],
): Record<string, string | null> => {
  const searchParams = request.nextUrl.searchParams;
  const result: Record<string, string | null> = {};

  keys.forEach((key) => {
    const value = searchParams.get(key);
    result[key] = value ? decodeURIComponent(value) : null;
  });

  return result;
};

export const requireSearchParams = (
  request: NextRequest,
  keys: string[],
): Record<string, string> | null => {
  const params = getDecodedSearchParams(request, keys);

  const missingKeys = keys.filter((key) => !params[key]);

  if (missingKeys.length > 0) {
    return null;
  }

  return params as Record<string, string>;
};
