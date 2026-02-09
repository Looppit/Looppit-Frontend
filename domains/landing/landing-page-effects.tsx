'use client';

import { useOAuthError } from '@/domains/auth/oauth';

/**
 * 랜딩 페이지 진입 시 실행할 클라이언트 부가 효과
 * - OAuth 에러 쿼리 처리(toast + 트래킹 + URL 정리)
 */
export function LandingPageEffects() {
  useOAuthError();
  return null;
}
