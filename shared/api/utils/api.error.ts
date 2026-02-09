import { AxiosError, AxiosInstance, isAxiosError } from 'axios';

import { BACKEND_ERROR, BackendErrorType } from '../api.constants';
import { handleUnAuthorizedError } from './api.refresh';
import { createApiError } from './api.response-format';

import type { ApiError, ErrorCode } from '../api.types';

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

/**
 * 네트워크 에러를 처리합니다.
 * 네트워크 연결 문제로 인한 에러를 API 에러 형식으로 변환하여 반환합니다.
 *
 * @returns 거부된 Promise (503 상태 코드와 네트워크 연결 확인 메시지 포함)
 */
export const handleNetworkError = () => {
  return Promise.reject(createApiError(503, '네트워크 연결을 확인해주세요.'));
};

/**
 * Axios 응답 에러를 처리합니다.
 * 401 에러인 경우 인증 토큰 갱신을 시도하고, 그 외의 경우 API 에러로 변환하여 반환합니다.
 *
 * @param instance - Axios 인스턴스
 * @param error - Axios 에러 객체
 * @returns 거부된 Promise (API 에러 형식)
 */
export const handleResponseError = (
  instance: AxiosInstance,
  error: AxiosError,
) => {
  if (!error.response) {
    return handleNetworkError();
  }

  const { status } = error.response;

  if (status === 401) {
    return handleUnAuthorizedError(instance, error);
  }

  const apiError = createApiError(error);

  return Promise.reject(apiError);
};

/**
 * 백엔드 에러 코드로부터 사용자에게 표시할 메시지를 가져옵니다.
 *
 * @param type - BackendErrorType[domain]
 * @param responseCode - ApiError['responseCode']
 * @param defaultMessage - 기본 에러 메시지
 * @returns 사용자에게 표시할 에러 메시지
 */
export const getUserErrorMessage = <T extends BackendErrorType>(
  type: T,
  responseCode?: ApiError['responseCode'],
  defaultMessage = '요청 처리에 실패했어요',
): string => {
  if (!responseCode) return defaultMessage;

  const errorMap = BACKEND_ERROR[type];

  if (responseCode in errorMap) {
    const errorCode = responseCode as keyof typeof errorMap;
    return errorMap[errorCode] as string;
  }

  return defaultMessage;
};
