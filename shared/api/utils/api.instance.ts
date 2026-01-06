import axios, { AxiosInstance } from 'axios';

import { API_TIMEOUT } from '@/shared/api/api.constants';
import { PROJECT_ENV } from '@/shared/constants';

export const initAxiosInstance = (
  baseUrl = PROJECT_ENV.apiEndPoint,
): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
