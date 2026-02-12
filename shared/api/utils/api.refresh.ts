import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { toApiError } from './api.error-format';
import { postReissue } from './api.refresh-api';

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

  private async performRefresh(axiosInstance: AxiosInstance) {
    try {
      await postReissue();
      await this.processSuspendedRequests(axiosInstance);
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.location.href = '/landing';
      }

      await this.rejectSuspendedRequests(error);
    } finally {
      this.clearSuspendedRequests();
    }
  }

  async handleUnAuthorizedError(
    axiosInstance: AxiosInstance,
    error: AxiosError,
  ) {
    try {
      if (typeof window === 'undefined') {
        return Promise.reject(toApiError(error));
      }

      const originalRequest = error.config;

      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(toApiError(error));
      }

      originalRequest._retry = true;
      const requestPromise = this.addSuspendedRequest(originalRequest);

      if (!this.isRefreshing) {
        this.isRefreshing = true;
        await this.performRefresh(axiosInstance);
      }
      return requestPromise;
    } catch (error) {
      return Promise.reject(toApiError(error));
    }
  }
}

const refreshTokenHandler = new RefreshTokenHandler();

const handleUnAuthorizedError =
  refreshTokenHandler.handleUnAuthorizedError.bind(refreshTokenHandler);
export { handleUnAuthorizedError };
