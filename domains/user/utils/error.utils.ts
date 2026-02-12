import type { ApiError } from '@/shared/api/api.types';
import { toApiErrorUserMessage } from '@/shared/error';

/**
 * 사용자 도메인 API 에러 → 사용자에게 보여줄 메시지
 */
export const getUserApiErrorMessage = (
  error: ApiError,
  defaultMessage = '사용자 처리에 실패했어요',
): string => {
  return toApiErrorUserMessage('USER', error, defaultMessage);
};
