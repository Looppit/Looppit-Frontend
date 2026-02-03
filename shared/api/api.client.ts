import { initAxiosInstance } from '@/shared/api/utils/api.instance';
import {
  setupErrorInterceptors,
  setupRequestInterceptor,
} from '@/shared/api/utils/api.interceptors';
import { PROJECT_ENV } from '@/shared/constants';

import { ApiClient } from './api.core';

export const createAxiosClient = () => {
  const instance = initAxiosInstance(PROJECT_ENV.clientBaseUrl);

  setupRequestInterceptor(instance);
  setupErrorInterceptors(instance);

  return instance;
};

export const apiClient = new ApiClient(createAxiosClient());
