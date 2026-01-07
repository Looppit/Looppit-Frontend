import { IS_CLIENT } from '@/shared/constants';
import type { Bridge } from '@/shared/types';

/**
 * 브릿지 요청을 보냅니다.
 * @param type 요청 타입
 * @param payload 요청 페이로드
 * @returns Promise로 응답을 반환합니다.
 */
export const bridgeRequest: Bridge['request'] = async (type, payload) => {
  if (!IS_CLIENT || !window.bridge) {
    throw new Error('Bridge is not available');
  }

  return window.bridge.request(type, payload);
};
