import { SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER } from '../auth.types';

export const SOCIAL_PROVIDER_KAKAO =
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.KAKAO;
export const SOCIAL_PROVIDER_NAVER =
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.NAVER;

export const OAUTH_REDIRECT = {
  /** 기존 사용자 SNS 로그인 성공 시 홈으로 (login_completed 트래킹용 쿼리 포함) */
  SUCCESS: (provider: string) => `/?oauth_login=${provider.toLowerCase()}`,
  SUCCESS_TO_ONBOARDING: (provider: string) =>
    `/onboarding?oauth_success=${provider.toLowerCase()}`,
  FAILURE: (errorCode: string, provider?: string) =>
    `/login?error=${errorCode}${provider ? `&provider=${provider}` : ''}`,
} as const;

/**
 * OAuth 에러 코드 상수
 *
 * 에러 코드는 쿼리 파라미터로 전달되며, 상위 컴포넌트에서
 * 에러 타입별로 분기 처리하여 사용자에게 적절한 메시지를 표시합니다.
 */
export const OAUTH_ERROR_CODES = {
  /** 필수 파라미터 누락 */
  MISSING_PARAMS: 'missing_params',
  /** OAuth 토큰 교환 실패 */
  OAUTH_FAILED: 'oauth_failed',
  /** 액세스 토큰 누락 */
  MISSING_TOKEN: 'missing_token',
  /** 네트워크 에러 */
  NETWORK_ERROR: 'network_error',
  /** 서버 에러 */
  SERVER_ERROR: 'server_error',
  /** 인증 에러 */
  AUTH_ERROR: 'auth_error',
  /** 검증 에러 */
  VALIDATION_ERROR: 'validation_error',
} as const;

export type OAuthErrorCode =
  (typeof OAUTH_ERROR_CODES)[keyof typeof OAUTH_ERROR_CODES];

/**
 * OAuth 에러 메시지 매핑
 *
 * 각 에러 타입에 맞는 사용자 친화적인 메시지를 제공합니다.
 */
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

/**
 * OAuth 기본 에러 메시지
 *
 * 에러 코드에 매핑되지 않은 경우 사용되는 기본 메시지입니다.
 */
export const OAUTH_DEFAULT_ERROR_MESSAGE =
  '소셜 로그인에 실패했습니다. 다시 시도해주세요.';
