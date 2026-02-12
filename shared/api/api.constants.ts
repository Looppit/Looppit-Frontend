import { PROJECT_ENV } from '@/shared/constants';

import type { HTTPErrorMessageMap } from './api.types';

export const { apiEndPoint: API_BASE_URL } = PROJECT_ENV;
export const API_TIMEOUT = 5000;

/**
 * HTTP 상태 코드별 기본 에러 메시지 맵
 * API 요청 시 서버에서 반환하는 HTTP 상태 코드에 따라 표시할 에러 메시지를 정의합니다.
 */
export const HTTP_ERROR_MESSAGE_MAP: HTTPErrorMessageMap = {
  400: '잘못된 요청입니다. 입력 내용을 확인해주세요.',
  401: '로그인이 필요합니다.',
  403: '접근 권한이 없습니다.',
  404: '요청하신 정보를 찾을 수 없습니다.',
  409: '이미 존재하는 항목입니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '서버 연결에 실패했습니다.',
  503: '서비스를 일시적으로 사용할 수 없습니다.',
};

export const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

/**
 * 백엔드에서 반환하는 커스텀 에러 코드별 메시지 맵
 * 도메인별로 그룹화되어 있으며, 각 도메인의 특정 에러 코드에 대한 사용자 친화적인 메시지를 정의합니다.
 *
 * @example
 * ```typescript
 * BACKEND_ERROR.CATEGORY.CATEGORY_ERROR_001 // '카테고리 이름이 이미 존재해요.'
 * ```
 */
export const BACKEND_ERROR = {
  USER: {
    EMAIL_ERROR_000: '이미 인증 코드가 있어요. 잠시 후에 다시 요청해주세요.',
    USER_ERROR_001: '이미 가입된 이메일이에요.',
    USER_ERROR_003: '인증 코드가 만료 되었어요, 다시 요청해주세요.',
    USER_ERROR_004: '인증 코드가 일치하지 않아요.',
    USER_ERROR_006: '비밀번호가 일치하지 않아요.',
    USER_ERROR_008: '탈퇴 후 30일 이내에는 재가입이 불가능해요.',
  },
  CATEGORY: {
    CATEGORY_ERROR_001: '카테고리 이름이 이미 존재해요.',
    CATEGORY_ERROR_003: '카테고리는 최대 20개까지 만들 수 있어요.',
  },
  S3: {},
} as const;

export type BackendErrorType = keyof typeof BACKEND_ERROR;

export type BackendErrorCode<T extends BackendErrorType> =
  keyof (typeof BACKEND_ERROR)[T];

export type AllBackendErrorCodes = {
  [K in BackendErrorType]: BackendErrorCode<K>;
}[BackendErrorType];
