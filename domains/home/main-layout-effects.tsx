'use client';

import { useOAuthLoginSuccess } from '@/domains/auth/oauth';
import { usePostHogUserIdentify } from '@/shared/lib/posthog';

/**
 * (main) 레이아웃 진입 시 실행할 클라이언트 부가 효과
 * - SNS 로그인 성공 처리(URL 정리 + login_completed 트래킹)
 * - PostHog 사용자 식별
 */
export function MainLayoutEffects() {
  useOAuthLoginSuccess();
  usePostHogUserIdentify();

  return null;
}
