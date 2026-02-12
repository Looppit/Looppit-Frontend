import type { ApiError } from '@/shared/api/api.types';
import { toApiErrorUserMessage } from '@/shared/error';

/**
 * 카테고리 도메인 API 에러 → 사용자에게 보여줄 메시지
 */
export const getCategoryErrorMessage = (
  error: ApiError,
  defaultMessage = '카테고리 처리에 실패했어요',
): string => {
  return toApiErrorUserMessage('CATEGORY', error, defaultMessage);
};
