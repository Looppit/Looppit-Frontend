import axios, { AxiosInstance } from 'axios';

import { API_TIMEOUT } from '@/shared/api/api.constants';

export const initAxiosInstance = (baseUrl: string): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
