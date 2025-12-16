/**
 * Auth 도메인 브릿지 액션 상수
 */
export const ACTION_TYPE = 'USER_ACTION' as const;

export const BRIDGE_REQUEST_OPTIONS = {
  action: 'kakao_login',
} as const;

/**
 * 카카오 SDK 클라이언트 에러 코드 상수
 */
export const KAKAO_ERROR_CODE = {
  NOT_SUPPORTED: 'NotSupported',
  CANCELLED: 'Cancelled',
  TOKEN_NOT_FOUND: 'TokenNotFound',
  BAD_PARAMETER: 'BadParameter',
  ILLEGAL_STATE: 'IllegalState',
  UNKNOWN: 'Unknown',
} as const;

export const KAKAO_ERROR_MESSAGES: Record<string, string> = {
  [KAKAO_ERROR_CODE.NOT_SUPPORTED]: '현재 환경에서는 지원하지 않는 기능이에요.',
  [KAKAO_ERROR_CODE.CANCELLED]: '로그인이 취소되었어요.',
  [KAKAO_ERROR_CODE.TOKEN_NOT_FOUND]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.BAD_PARAMETER]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.ILLEGAL_STATE]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.UNKNOWN]:
    '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
} as const;

export const KAKAO_DEFAULT_ERROR_MESSAGE =
  '로그인 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.';

/**
 * NextAuth 옵션 상수
 */
export const NEXT_AUTH_OPTIONS = {
  callbackUrl: '/',
} as const;

/**
 * 기본 에러 메시지
 */
export const DEFAULT_ERROR_MESSAGE =
  '네트워크나 기타 알 수 없는 에러가 발생했습니다.';
