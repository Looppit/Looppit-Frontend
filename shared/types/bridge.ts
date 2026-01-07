/**
 * 브릿지 요청 타입
 */
export type BridgeRequestType = string;

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
 * 브릿지 메시지 구조
 */
export interface BridgeMessage {
  type: BridgeRequestType;
  payload?: BridgeRequestPayload;
  id: string;
  timestamp: number;
}

/**
 * 브릿지 요청 옵션
 */
export interface BridgeRequestOptions {
  /**
   * 요청 타임아웃 (밀리초)
   * 0 이하의 값은 타임아웃을 사용하지 않습니다.
   */
  timeout?: number;
}

/**
 * 브릿지 리스너 함수 타입
 */
export type BridgeListener = (message: BridgeMessage) => void;

/**
 * 브릿지 인터페이스
 */
export interface Bridge {
  /**
   * 메시지를 보냅니다 (응답 없음)
   * @param type 메시지 타입
   * @param payload 메시지 페이로드
   */
  send(type: BridgeRequestType, payload?: BridgeRequestPayload): void;

  /**
   * 브릿지 요청을 보냅니다.
   * @param type 요청 타입
   * @param payload 요청 페이로드
   * @param options 요청 옵션
   * @returns Promise로 응답을 반환합니다.
   */
  request<T = unknown>(
    type: BridgeRequestType,
    payload?: BridgeRequestPayload,
    options?: BridgeRequestOptions,
  ): Promise<BridgeResponse<T>>;

  /**
   * 메시지 리스너를 등록합니다.
   * @param callback 메시지를 받을 콜백 함수
   */
  onMessage(callback: BridgeListener): void;

  /**
   * 등록된 리스너를 제거합니다.
   * @param callback 제거할 콜백 함수
   */
  removeListener(callback: BridgeListener): void;

  /**
   * 모든 리스너를 제거합니다.
   */
  removeAllListeners(): void;
}
