import type { ApiError } from '@/shared/api/api.types';
import { isNormalizedApiError } from '@/shared/api/utils';

import {
  OAUTH_ERROR_CODES,
  OAUTH_ERROR_MESSAGES,
  OAUTH_USER_MESSAGE_MAP,
  STATUS_CODE_TO_OAUTH_CODE,
  type OAuthErrorCodeParam,
} from './constants';

/**
 * OAuth 플로우용 에러 타입 (SDK/앱 에러를 통일된 형태로)
 */
export type OAuthError = {
  code: OAuthErrorCodeParam;
  message: string;
  originalError?: unknown;
};

/**
 * 원시 에러(unknown)를 OAuth 플로우용 OAuthError로 통일
 * ApiError, 기타를 코드/메시지로 정규화
 */
/**
 * @param error - 처리할 원시 에러
 * @returns OAuth 플로우용으로 정규화된 에러
 */
export const toOAuthError = (error: unknown): OAuthError => {
  if (isNormalizedApiError(error)) {
    return mapApiErrorToOAuthError(error);
  }

  return {
    code: OAUTH_ERROR_CODES.OAUTH_FAILED,
    message: OAUTH_ERROR_MESSAGES[OAUTH_ERROR_CODES.OAUTH_FAILED],
    originalError: error,
  };
};

/**
 * @param apiError - ApiError
 * @returns OAuth 플로우용으로 정규화된 에러
 */
const mapApiErrorToOAuthError = (apiError: ApiError): OAuthError => {
  const { code: statusCode, responseCode } = apiError;

  if (responseCode && responseCode in OAUTH_USER_MESSAGE_MAP) {
    return {
      code: responseCode,
      message: OAUTH_USER_MESSAGE_MAP[responseCode],
      originalError: apiError,
    };
  }

  const code =
    STATUS_CODE_TO_OAUTH_CODE[statusCode] ?? OAUTH_ERROR_CODES.OAUTH_FAILED;

  return {
    code,
    message: OAUTH_ERROR_MESSAGES[code],
    originalError: apiError,
  };
};
