import { BackendErrorType } from '@/shared/api/api.constants';
import type { ApiError } from '@/shared/api/api.types';

/**
 * ApiError → 사용자에게 보여줄 메시지 (한 번에 처리)
 * - 1. responseCode 없음 (네트워크 등) → error.message 그대로 (예: '네트워크 연결을 확인해주세요.')
 * - 2. responseCode 있음 + 도메인 매핑 있음 → 매핑된 메시지
 * - 3. responseCode 있음 + 매핑 없음 → error.message ?? defaultMessage
 */
export const toApiErrorUserMessage = <T extends BackendErrorType>(
  domain: T,
  error: ApiError,
  defaultMessage = '요청 처리에 실패했어요',
): string => {
  //TODO: 백엔드 에러코드가 중복되는 이슈가 있어 error.message 임시 사용
  // if (!error.responseCode) {
  //   return error.message;
  // }

  // const errorMap = BACKEND_ERROR[domain];

  // if (error.responseCode in errorMap) {
  //   const code = error.responseCode as keyof typeof errorMap;
  //   return errorMap[code] as string;
  // }

  return error.message ?? defaultMessage;
};
