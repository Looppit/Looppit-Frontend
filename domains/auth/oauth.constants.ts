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

