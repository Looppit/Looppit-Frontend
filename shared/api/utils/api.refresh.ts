import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getDefaultStore } from 'jotai';

import { tokenAtom } from '@/shared/store/auth.atom';
import { removeTokensFromCookies } from '@/shared/utils';

import { fetchRefreshToken } from './api.action';

const store = getDefaultStore();

type SuspendedRequest = {
  config: InternalAxiosRequestConfig;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

class RefreshTokenHandler {
  private isRefreshing: boolean;
  private suspendedRequests: SuspendedRequest[];
  private onAuthorizationError: () => void;

  constructor(onAuthorizationError: () => void) {
    this.isRefreshing = false;
    this.suspendedRequests = [];
    this.onAuthorizationError = onAuthorizationError;
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

  private processSuspendedRequests(refreshToken: string) {
    return Promise.all(
      this.suspendedRequests.map((suspendedRequest) => {
        suspendedRequest.config.headers.Authorization = `Bearer ${refreshToken}`;

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

  async handleUnAuthorizedError(error: AxiosError) {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (this.isRefreshing) {
      return await this.addSuspendedRequest(originalRequest);
    }

    this.isRefreshing = true;

    try {
      const { accessToken } = await fetchRefreshToken();

      store.set(tokenAtom, accessToken);

      this.processSuspendedRequests(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return originalRequest;
    } catch (error) {
      this.onAuthorizationError();
      this.rejectSuspendedRequests(error);

      return Promise.reject(error);
    } finally {
      this.clearSuspendedRequests();
    }
  }
}

const onAuthorizationError = async () => {
  await removeTokensFromCookies();
  store.set(tokenAtom, null);

  window.location.href = '/login';
};

const refreshTokenHandler = new RefreshTokenHandler(onAuthorizationError);

export const handleUnAuthorizedError = async (error: AxiosError) =>
  await refreshTokenHandler.handleUnAuthorizedError(error);
