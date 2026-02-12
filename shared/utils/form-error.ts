/**
 * react-hook-form의 FieldErrors에서 첫 번째 필드 에러 메시지를 반환합니다.
 * @param errors - react-hook-form의 FieldErrors 객체
 * @param defaultMessage - 에러 메시지가 없을 때 사용할 기본 메시지 (옵셔널)
 * @returns 첫 번째 필드의 에러 메시지, 또는 defaultMessage 또는 기본 메시지
 */
export function getFirstFormErrorMessage<
  T extends Record<string, { message?: string } | undefined>,
>(errors: T | undefined, defaultMessage?: string): string {
  const message = defaultMessage || '입력 정보를 확인해주세요.';

  if (!errors || typeof errors !== 'object') {
    return message;
  }
  const firstError = Object.values(errors)[0];
  return firstError?.message || message;
}
