import {
  handleNetworkError,
  handleResponseError,
} from '@/shared/api/utils/api.error';
import { tokenAtom } from '@/shared/store/auth.atom';
import { AxiosInstance } from 'axios';
import { getDefaultStore } from 'jotai';

const store = getDefaultStore();

export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = store.get(tokenAtom);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setupErrorInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        return handleNetworkError();
      }

      return handleResponseError(error);
    },
  );
};
