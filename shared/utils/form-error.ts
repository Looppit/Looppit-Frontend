/**
 * errors에서 첫 번째 필드 에러 메시지를 반환합니다.
 * @returns 첫 번째 에러 메시지 또는 undefined
 */
export function getFirstFormErrorMessage<
  T extends Record<string, { message?: string } | undefined>,
>(errors: T | undefined): string | undefined {
  if (!errors || typeof errors !== 'object') return undefined;
  const firstError = Object.values(errors)[0];
  return firstError?.message;
}
