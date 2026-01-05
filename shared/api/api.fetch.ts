// @/shared/api/fetchClient.ts
import { PROJECT_ENV } from '@/shared/constants';

import { FetchError } from './fetch.error';

interface FetchOptions extends RequestInit {
  endpoint: string;
}

export async function apiFetch<T>(options: FetchOptions): Promise<T> {
  const { apiEndPoint } = PROJECT_ENV;
  const { endpoint, ...fetchOptions } = options;

  const response = await fetch(apiEndPoint + endpoint, fetchOptions);

  if (!response.ok) {
    throw new FetchError(response.status);
  }

  return response.json();
}
