import axios, { AxiosInstance } from 'axios';

import { API_BASE_URL, API_TIMEOUT } from '../api.constants';

export const initAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
