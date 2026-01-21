import { AxiosInstance } from 'axios';

import { handleResponseError } from '@/shared/api/utils/api.error';

export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setupErrorInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return handleResponseError(instance, error);
    },
  );
};
