import axios, { AxiosInstance } from 'axios';

import { PROJECT_ENV } from '@/shared/constants';

import { API_TIMEOUT } from '../api.constants';

export const initAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: PROJECT_ENV.apiEndPoint,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
