import { isAxiosError } from 'axios';

import { getErrorMessage, getResponseCode, isNumber } from '@/shared/utils';

import {
  DEFAULT_ERROR_MESSAGE,
  HTTP_ERROR_MESSAGE_MAP,
} from '../api.constants';
import { ApiError } from '../api.types';

import type { HTTPErrorCode } from '../api.types';

/**
 *
 * 1. [반환] 이미 ApiError면 그대로 반환
 * 2. [생성] HTTP 상태 코드로 ApiError 생성
 * 3. [변환] 원시 에러 → ApiError 변환
 *
 * 인터셉터·refresh·서버 API 등에서 catch된 에러를 UI/도메인에서 쓰는 ApiError로 통일할 때 사용합니다.
 *
 * @param errorOrStatus - 변환할 에러 객체, 또는 HTTP 상태 코드(숫자)
 * @param defaultMessage - 에러 메시지를 추출할 수 없을 때 기본 메시지
 * @returns 통일된 ApiError
 */
export const toApiError = (
  errorOrStatus: unknown,
  defaultMessage = DEFAULT_ERROR_MESSAGE,
): ApiError => {
  /** 1번 : 이미 ApiError면 그대로 반환 */
  if (isNormalizedApiError(errorOrStatus)) {
    return errorOrStatus;
  }

  /** 2번 : HTTP 상태 코드로 ApiError 생성 */
  if (isNumber(errorOrStatus)) {
    return createApiErrorFromStatus(errorOrStatus, defaultMessage);
  }

  /** 3번 : 원시 에러 → ApiError 변환 */
  const code = toHttpStatusFromError(errorOrStatus);
  const message = getErrorMessage(
    errorOrStatus,
    HTTP_ERROR_MESSAGE_MAP[code] ?? defaultMessage,
  );
  const responseCode = getResponseCode(errorOrStatus);

  return { code, message, responseCode };
};

/**
 * HTTP 상태 코드와 메시지로 ApiError를 생성합니다.
 * responseCode는 없이 만듭니다 (네트워크/타임아웃 등 상태만 알 때 사용).
 */
const createApiErrorFromStatus = (code: number, message: string): ApiError => {
  return { code: code as HTTPErrorCode, message, responseCode: undefined };
};

/** 이미 ApiError 형태로 정규화된 객체인지 여부 */
export const isNormalizedApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error &&
    typeof error.code === 'number' &&
    !('isAxiosError' in error)
  );
};

/**
 * 에러 객체에서 HTTP 상태 코드를 추출해 ApiError.code 타입으로 반환합니다.
 * Axios 에러면 response.status, 그 외는 500을 사용합니다.
 *
 * @param error - Axios 에러 또는 unknown
 * @returns HTTP 상태 코드 (400 | 401 | 403 | 404 | 409 | 500 | 502 | 503)
 */
export const toHttpStatusFromError = (error: unknown): HTTPErrorCode => {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    return status as HTTPErrorCode;
  }
  return 500;
};
