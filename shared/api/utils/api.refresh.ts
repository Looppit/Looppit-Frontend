import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { apiServerClient } from '@/shared/api/api.server-client';
import { applySetCookieHeader, makeNextResponseError } from '@/shared/utils';

import { createApiResponse } from './api.response-format';

/**
 * 리프레시 토큰 재발급 api route
 * refresh token의 path를 임의로 조정해놓은 상태이므로 추후에 문제가 될 경우 Request를 수정하여 보내야 합니다.
 */
export const fetchRefreshToken = async () => {
  try {
    const response = await apiServerClient.requestRaw('/auth/reissue', {
      method: 'POST',
    });
    const setCookieHeaders = response.headers['set-cookie'];

    if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
      await applySetCookieHeader(setCookieHeaders);
    }

    return createApiResponse(response.data, '토큰 재발급에 성공했습니다.');
  } catch (error) {
    return makeNextResponseError(error);
  }
};

type SuspendedRequest = {
  config: InternalAxiosRequestConfig;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

class RefreshTokenHandler {
  private isRefreshing: boolean;
  private suspendedRequests: SuspendedRequest[];

  constructor() {
    this.isRefreshing = false;
    this.suspendedRequests = [];
  }

  private async addSuspendedRequest(config: InternalAxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.suspendedRequests.push({ config, resolve, reject });
    });
  }

  private clearSuspendedRequests(): void {
    this.suspendedRequests = [];
    this.isRefreshing = false;
  }

  private async processSuspendedRequests(axiosInstance: AxiosInstance) {
    await Promise.all(
      this.suspendedRequests.map(({ config, resolve, reject }) => {
        axiosInstance.request(config).then(resolve).catch(reject);
      }),
    );
  }

  private async rejectSuspendedRequests(error: unknown) {
    await Promise.all(
      this.suspendedRequests.map((suspendedRequest) => {
        suspendedRequest.reject(error);
      }),
    );
  }

  async handleUnAuthorizedError(
    error: AxiosError,
    onAuthorizationError: () => void,
  ) {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (this.isRefreshing) {
      return await this.addSuspendedRequest(originalRequest);
    }

    this.isRefreshing = true;

    try {
      await fetchRefreshToken();

      this.processSuspendedRequests();
      return originalRequest;
    } catch (error) {
      onAuthorizationError();
      this.rejectSuspendedRequests(error);

      return Promise.reject(error);
    } finally {
      this.clearSuspendedRequests();
    }
  }
}

const refreshTokenHandler = new RefreshTokenHandler();

const handleUnAuthorizedError = refreshTokenHandler.handleUnAuthorizedError;
export { handleUnAuthorizedError };
