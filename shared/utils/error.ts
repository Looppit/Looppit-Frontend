import { IS_DEVELOPMENT } from '@/shared/constants';

/**
 * Error 객체인지 확인하는 타입 가드
 * @param error - 확인할 에러 객체
 * @returns Error 인스턴스인지 여부
 */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
/**
 * production이 아닐 때 에러 메시지 앞에 [WEB] 접두사 추가
 */
const prefixErrorMessage = (message: string): string => {
  if (IS_DEVELOPMENT) {
    return `[WEB] ${message}`;
  }
  return message;
};

/**
 * 에러 메시지를 추출하는 유틸
 * @param error - 에러 객체
 * @param defaultMessage - 기본 메시지
 * @returns 에러 메시지 또는 기본 메시지
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string,
): string => {
  return isError(error) ? error.message : defaultMessage;
};
