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

export type KakaoErrorCode =
  (typeof KAKAO_ERROR_CODE)[keyof typeof KAKAO_ERROR_CODE];

/**
 * 카카오 에러 메시지 매핑
 *
 * 카카오 SDK에서 발생하는 에러 코드에 대한 사용자 친화적인 메시지를 제공합니다.
 */
export const KAKAO_ERROR_MESSAGES: Record<KakaoErrorCode, string> = {
  [KAKAO_ERROR_CODE.NOT_SUPPORTED]: '현재 환경에서는 지원하지 않는 기능이에요.',
  [KAKAO_ERROR_CODE.CANCELLED]: '로그인이 취소되었어요.',
  [KAKAO_ERROR_CODE.TOKEN_NOT_FOUND]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.BAD_PARAMETER]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.ILLEGAL_STATE]: '잘못된 요청이에요. 다시 시도해주세요.',
  [KAKAO_ERROR_CODE.UNKNOWN]:
    '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
} as const;

/**
 * 카카오 기본 에러 메시지
 *
 * 카카오 SDK 에러 코드에 매핑되지 않은 경우 사용되는 기본 메시지입니다.
 */
export const KAKAO_DEFAULT_ERROR_MESSAGE =
  '로그인 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.';
