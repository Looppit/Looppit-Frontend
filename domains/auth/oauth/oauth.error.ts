import { ZodError } from 'zod';

import { ApiError } from '@/shared/api/api.types';
import { isApiError } from '@/shared/guard/api-error';

import {
  OAUTH_ERROR_CODES,
  OAUTH_ERROR_MESSAGES,
  OAuthErrorCode,
} from './oauth.constants';

/**
 * OAuth 에러 타입 분류
 *
 * 에러를 타입별로 분류하여 적절한 에러 코드와 메시지를 반환합니다.
 * 이 함수는 하위 레이어에서 발생한 다양한 에러를 통일된 형식으로 변환합니다.
 */
export type OAuthError = {
  code: OAuthErrorCode;
  message: string;
  originalError?: unknown;
};

/**
 * 에러를 OAuth 에러 타입으로 분류하고 변환합니다.
 *
 * @param error - 발생한 에러 객체
 * @returns 분류된 OAuth 에러 객체
 *
 * @description
 * 이 함수는 OAuth 흐름에 맞춰 최소 분기만 수행합니다:
 * - ZodError: 검증 에러
 * - ApiError: HTTP 상태 기반 분기
 * - 기타: OAuth 실패로 단일화
 */
export const classifyOAuthError = (error: unknown): OAuthError => {
  if (error instanceof ZodError) {
    return {
      code: OAUTH_ERROR_CODES.VALIDATION_ERROR,
      message: OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.VALIDATION_ERROR],
      originalError: error,
    };
  }

  if (isApiError(error)) {
    return classifyApiError(error);
  }

  return {
    code: OAUTH_ERROR_CODES.OAUTH_FAILED,
    message: OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.OAUTH_FAILED],
    originalError: error,
  };
};

/**
 * API 에러를 OAuth 에러 코드로 변환합니다.
 *
 * @param apiError - API 에러 객체
 * @returns 분류된 OAuth 에러 객체
 */
const classifyApiError = (apiError: ApiError): OAuthError => {
  const code = apiError.code;

  if (typeof code === 'string' && code.startsWith('HTTP_')) {
    const statusCode = parseInt(code.replace('HTTP_', ''), 10);

    if (statusCode === 400) {
      return {
        code: OAUTH_ERROR_CODES.VALIDATION_ERROR,
        message:
          apiError.message ||
          OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.VALIDATION_ERROR],
        originalError: apiError,
      };
    }

    if (statusCode === 401 || statusCode === 403) {
      return {
        code: OAUTH_ERROR_CODES.AUTH_ERROR,
        message:
          apiError.message ||
          OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.AUTH_ERROR],
        originalError: apiError,
      };
    }

    return {
      code: OAUTH_ERROR_CODES.OAUTH_FAILED,
      message:
        apiError.message ||
        OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.OAUTH_FAILED],
      originalError: apiError,
    };
  }

  return {
    code: OAUTH_ERROR_CODES.OAUTH_FAILED,
    message:
      apiError.message || OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.OAUTH_FAILED],
    originalError: apiError,
  };
};

/**
 * 에러 코드로부터 사용자 메시지를 가져옵니다.
 *
 * @param errorCode - OAuth 에러 코드
 * @returns 사용자에게 표시할 메시지
 */
export const getOAuthErrorMessage = (errorCode: OAuthErrorCode): string => {
  return (
    OAUTH_ERROR_MESSAGES[errorCode] ||
    OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.OAUTH_FAILED]
  );
};
