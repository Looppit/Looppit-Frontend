'use client';

import { initAxiosInstance } from '@/shared/api/utils/api.instance';
import {
  setupErrorInterceptors,
  setupRequestInterceptor,
} from '@/shared/api/utils/api.interceptors';

import { ApiClient } from './api.core';

export const createAxiosClient = () => {
  const instance = initAxiosInstance();

  setupRequestInterceptor(instance);
  setupErrorInterceptors(instance);

  return instance;
};

export const apiClient = new ApiClient(createAxiosClient());
