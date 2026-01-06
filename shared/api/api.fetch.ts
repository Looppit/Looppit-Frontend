// @/shared/api/fetchClient.ts
import { ENV_CONFIG } from '@/shared/utils';

import { FetchError } from './fetch.error';

interface FetchOptions extends RequestInit {
  endpoint: string;
}

export async function apiFetch<T>(options: FetchOptions): Promise<T> {
  const { apiEndPoint } = ENV_CONFIG;
  const { endpoint, ...fetchOptions } = options;

  const response = await fetch(apiEndPoint + endpoint, fetchOptions);

  if (!response.ok) {
    throw new FetchError(response.status);
  }

  return response.json();
}
