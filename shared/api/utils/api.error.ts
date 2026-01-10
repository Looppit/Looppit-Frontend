import { AxiosError, AxiosInstance, isAxiosError } from 'axios';

import { removeTokensFromCookies } from '@/shared/utils';

import { handleUnAuthorizedError } from './api.refresh';
import { createApiError } from './api.response-format';

import type { ErrorCode, ErrorResponse } from '../api.types';

/**
 * 에러 코드를 추출하는 유틸
 * @param error - 에러 객체
 * @returns 에러 코드
 */
export const getErrorCode = (error: unknown): ErrorCode => {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    return status as ErrorCode;
  }

  return 500 as ErrorCode;
};

const onAuthorizationError = async () => {
  await removeTokensFromCookies();

  window.location.href = '/login';
};

export const handleNetworkError = () => {
  return Promise.reject(createApiError(503, '네트워크 연결을 확인해주세요.'));
};

export const handleResponseError = (
  instance: AxiosInstance,
  error: AxiosError,
) => {
  if (!error.response) {
    return handleNetworkError();
  }

  const { status, data } = error.response;

  if (status === 401) {
    return handleUnAuthorizedError(instance, error, onAuthorizationError);
  }

  const errorResponse = data as ErrorResponse | undefined;
  const apiError = createApiError(errorResponse?.message);

  return Promise.reject(apiError);
};
