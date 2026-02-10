import {
  handleNetworkError,
  handleUnAuthorizedError,
  initAxiosInstance,
  setupInterceptors,
  toApiError,
} from '@/shared/api/utils';
import { PROJECT_ENV } from '@/shared/constants';

import { ApiClient } from './api.core';

const instance = initAxiosInstance(PROJECT_ENV.clientBaseUrl);

setupInterceptors(instance, {
  request: {
    onFulfilled: async (config) => config,
    onRejected: (error) => Promise.reject(error),
  },
  response: {
    onFulfilled: (response) => response,
    onRejected: (error) => {
      if (!error.response) {
        return handleNetworkError();
      }

      if (error.response.status === 401) {
        return handleUnAuthorizedError(instance, error);
      }

      return Promise.reject(toApiError(error));
    },
  },
});

export const apiClient = new ApiClient(instance);
