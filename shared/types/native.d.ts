import type { Bridge, BridgeMessage } from './bridge';

/**
 * 네이티브 관련 Window 인터페이스 확장
 */
declare global {
  interface Window {
    bridge?: Bridge;
    /**
     * 네이티브에서 호출하는 메시지 핸들러
     * @param message 브릿지 메시지
     */
    bridge_onMessage?: (message: BridgeMessage) => void;
    /**
     * 네이티브에서 호출하는 응답 핸들러
     * @param response 브릿지 응답 메시지
     */
    bridge_onResponse?: (response: BridgeMessage) => void;
    ReactNativeWebView?: {
      postMessage?: (message: string) => void;
      [key: string]: unknown;
    };
  }
}

export {};
