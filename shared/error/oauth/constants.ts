/**
 * OAuth/SDK 플로우용 에러 코드·메시지 상수
 */
import type { AllBackendErrorCodes } from '@/shared/api/api.constants';

import { BACKEND_ERROR_MESSAGES } from './backend-error';

export const OAUTH_ERROR_CODES = {
  MISSING_PARAMS: 'missing_params',
  OAUTH_FAILED: 'oauth_failed',
  MISSING_TOKEN: 'missing_token',
  NETWORK_ERROR: 'network_error',
  SERVER_ERROR: 'server_error',
  AUTH_ERROR: 'auth_error',
  VALIDATION_ERROR: 'validation_error',
} as const;

export type OAuthErrorCode =
  (typeof OAUTH_ERROR_CODES)[keyof typeof OAUTH_ERROR_CODES];

export const OAUTH_ERROR_MESSAGES: Record<OAuthErrorCode, string> = {
  [OAUTH_ERROR_CODES.MISSING_PARAMS]:
    '필수 정보가 누락되었습니다. 다시 시도해주세요.',
  [OAUTH_ERROR_CODES.OAUTH_FAILED]:
    '소셜 로그인에 실패했습니다. 다시 시도해주세요.',
  [OAUTH_ERROR_CODES.MISSING_TOKEN]:
    '인증 토큰이 없습니다. 다시 로그인해주세요.',
  [OAUTH_ERROR_CODES.NETWORK_ERROR]: '네트워크 연결을 확인해주세요.',
  [OAUTH_ERROR_CODES.SERVER_ERROR]:
    '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  [OAUTH_ERROR_CODES.AUTH_ERROR]: '인증에 실패했습니다. 다시 로그인해주세요.',
  [OAUTH_ERROR_CODES.VALIDATION_ERROR]: '입력 정보를 확인해주세요.',
} as const;

export const OAUTH_DEFAULT_ERROR_MESSAGE =
  '소셜 로그인에 실패했습니다. 다시 시도해주세요.';

export type OAuthErrorCodeParam = OAuthErrorCode | AllBackendErrorCodes;

export const OAUTH_ERROR_PARAM_CODES = [
  ...Object.values(OAUTH_ERROR_CODES),
  ...Object.keys(BACKEND_ERROR_MESSAGES),
] as OAuthErrorCodeParam[];

export const OAUTH_USER_MESSAGE_MAP: Record<OAuthErrorCodeParam, string> = {
  ...OAUTH_ERROR_MESSAGES,
  ...BACKEND_ERROR_MESSAGES,
};

export const STATUS_CODE_TO_OAUTH_CODE: Record<number, OAuthErrorCode> = {
  400: OAUTH_ERROR_CODES.VALIDATION_ERROR,
  401: OAUTH_ERROR_CODES.AUTH_ERROR,
  403: OAUTH_ERROR_CODES.AUTH_ERROR,
};
