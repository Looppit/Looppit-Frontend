import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { fetchRefreshToken } from './api.action';

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

  private addSuspendedRequest(config: InternalAxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.suspendedRequests.push({ config, resolve, reject });
    });
  }

  private clearSuspendedRequests(): void {
    this.suspendedRequests = [];
    this.isRefreshing = false;
  }

  private processSuspendedRequests() {
    return Promise.all(
      this.suspendedRequests.map((suspendedRequest) => {
        suspendedRequest.resolve(suspendedRequest.config);
      }),
    );
  }

  private rejectSuspendedRequests(error: unknown) {
    return Promise.all(
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

export const handleUnAuthorizedError = async (
  error: AxiosError,
  onAuthorizationError: () => void,
) =>
  await refreshTokenHandler.handleUnAuthorizedError(
    error,
    onAuthorizationError,
  );
