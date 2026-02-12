import { toApiError } from './api.error-format';

/**
 * 네트워크 에러를 처리합니다.
 * 네트워크 연결 문제로 인한 에러를 API 에러 형식으로 변환하여 반환합니다.
 *
 * @returns 거부된 Promise (503 상태 코드와 네트워크 연결 확인 메시지 포함)
 */
export const handleNetworkError = () => {
  return Promise.reject(toApiError(503, '네트워크 연결을 확인해주세요.'));
};
