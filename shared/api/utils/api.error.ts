import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGE_MAP } from '../api.constants';
import { handleUnAuthorizedError } from './api.refresh';
import { isErrorStatusKey } from './api.type-guard';

import type { ApiError, ErrorResponse } from '../api.types';

export const transformError = (
  statusCode: number,
  serverMessage?: string,
): ApiError => {
  const statusKey = isErrorStatusKey(statusCode) ? statusCode : 500;
  const message = ERROR_MESSAGE_MAP[statusKey] || DEFAULT_ERROR_MESSAGE;

  return {
    code: `HTTP_${statusKey}`,
    message: serverMessage || message,
  };
};

export const handleUnauthorized = (error: AxiosError) => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }

  return handleUnAuthorizedError(error);
};

export const handleNetworkError = () => {
  return Promise.reject(transformError(503, '네트워크 연결을 확인해주세요.'));
};

export const handleResponseError = (error: AxiosError) => {
  if (!error.response) {
    return handleNetworkError();
  }

  const { status, data } = error.response;

  if (status === 401) {
    return handleUnauthorized(error);
  }

  const errorResponse = data as ErrorResponse | undefined;
  const apiError = transformError(status, errorResponse?.message);

  return Promise.reject(apiError);
};
