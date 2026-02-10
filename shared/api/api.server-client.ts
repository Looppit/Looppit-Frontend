import {
  initAxiosInstance,
  setupInterceptors,
  toApiError,
} from '@/shared/api/utils';

import { API_BASE_URL } from './api.constants';
import { ApiClient } from './api.core';

const serverInstance = initAxiosInstance(API_BASE_URL);

setupInterceptors(serverInstance, {
  request: {
    onFulfilled: (config) => config,
    onRejected: (error) => Promise.reject(error),
  },
  response: {
    onFulfilled: (response) => response,
    onRejected: (error) => Promise.reject(toApiError(error)),
  },
});

export const apiServerClient = new ApiClient(serverInstance);
