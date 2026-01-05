import { AxiosInstance } from 'axios';

import type { RequestConfig } from '@/shared/api/api.types';
import { initAxiosInstance } from '@/shared/api/utils/api.instance';
import {
  setupErrorInterceptors,
  setupRequestInterceptor,
} from '@/shared/api/utils/api.interceptors';

export class ApiClient {
  constructor(private readonly client: AxiosInstance) {}

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body,
      headers,
    });
  }

  put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body,
      headers,
    });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = config;
    const response = await this.client.request<T>({
      url: endpoint,
      method,
      headers,
      data: body,
    });
    return response.data;
  }
}

export const createAxiosClient = () => {
  const instance = initAxiosInstance();

  setupRequestInterceptor(instance);
  setupErrorInterceptors(instance);

  return instance;
};

export const apiClient = new ApiClient(createAxiosClient());
export const apiServerClient = new ApiClient(initAxiosInstance());
