/**
 * 브릿지 요청 타입
 */
export type BridgeRequestType = 'USER_ACTION' | string;

/**
 * 브릿지 요청 페이로드
 */
export interface BridgeRequestPayload {
  action?: string;
  [key: string]: unknown;
}

/**
 * 브릿지 응답
 */
export type BridgeResponse<T = unknown> = T;

/**
 * 브릿지 리스너 함수 타입
 */
export type BridgeListener = (data: unknown) => void;

/**
 * 브릿지 인터페이스
 */
export interface Bridge {
  /**
   * 브릿지 요청을 보냅니다.
   * @param type 요청 타입
   * @param payload 요청 페이로드
   * @returns Promise로 응답을 반환합니다.
   */
  request<T = unknown>(
    type: BridgeRequestType,
    payload?: BridgeRequestPayload,
  ): Promise<BridgeResponse<T>>;

  /**
   * 리스너 배열
   */
  listeners: BridgeListener[];

  /**
   * 대기 중인 요청들
   */
  pendingRequests: Record<string, unknown>;
}
