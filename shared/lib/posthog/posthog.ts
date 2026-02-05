import posthog from 'posthog-js';

/**
 * PostHog 인스턴스 래퍼
 * 직접 posthog-js를 import하지 않고 이 유틸을 통해 사용
 */
export const posthogClient = posthog;

export const isPostHogReady = (): boolean => {
  return posthogClient.__loaded || false;
};
