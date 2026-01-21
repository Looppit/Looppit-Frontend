import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { RequestConfig } from '@/shared/api/api.types';

export class ApiClient {
  constructor(private readonly client: AxiosInstance) {}

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  patch<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  /**
   * 응답 데이터만 반환 (일반적인 API 호출용)
   */
  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const response = await this.requestRaw<T>(endpoint, config);
    return response.data;
  }

  /**
   * 전체 AxiosResponse 반환 (헤더 접근 필요 시)
   * @example Set-Cookie 파싱, Content-Type 확인, 페이지네이션 헤더 등
   */
  async requestRaw<T>(
    endpoint: string,
    config: RequestConfig = {},
    axiosConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const { method = 'GET', headers = {}, body } = config;

    return this.client.request<T>({
      url: endpoint,
      method,
      headers,
      data: body,
      ...axiosConfig,
    });
  }
}
