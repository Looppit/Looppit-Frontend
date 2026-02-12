/**
 * 객체 관련 유틸리티 함수들
 */

/**
 * 객체에서 비어있는 필드(null, undefined, 빈 문자열)를 제거하는 함수
 * @param obj - 필터링할 객체
 * @returns 비어있는 필드가 제거된 새로운 객체
 */
export const omitEmptyValues = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> => {
  const result = {} as Partial<T>;

  for (const key in obj) {
    const value = obj[key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      continue;
    }

    result[key] = value;
  }

  return result;
};
