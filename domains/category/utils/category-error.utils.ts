import type { ApiError } from '@/shared/api/api.types';
import { getUserErrorMessage } from '@/shared/api/utils';

/**
 * 카테고리 도메인 에러 메시지를 가져옵니다.
 *
 * @param error - API 에러 객체
 * @param defaultMessage - 기본 에러 메시지
 * @returns 사용자에게 표시할 에러 메시지
 */
export const getCategoryErrorMessage = (
  error: ApiError,
  defaultMessage = '카테고리 처리에 실패했어요',
): string => {
  return getUserErrorMessage('CATEGORY', error.responseCode, defaultMessage);
};
