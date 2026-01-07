import { PROJECT_ENV } from '@/shared/constants';

import type { ErrorMessageMap } from './api.types';

export const { apiEndPoint: API_BASE_URL } = PROJECT_ENV;
export const API_TIMEOUT = 5000;

export const ERROR_MESSAGE_MAP: ErrorMessageMap = {
  400: '잘못된 요청입니다. 입력 내용을 확인해주세요.',
  401: '로그인이 필요합니다.',
  403: '접근 권한이 없습니다.',
  404: '요청하신 정보를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '서버 연결에 실패했습니다.',
  503: '서비스를 일시적으로 사용할 수 없습니다.',
};

export const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';
