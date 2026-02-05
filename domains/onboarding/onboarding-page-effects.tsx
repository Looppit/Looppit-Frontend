'use client';

import { useOAuthSignupSuccess } from '@/domains/auth/oauth';

import { useSeedInitialData } from './hooks';

/**
 * 온보딩 페이지 진입 시 실행할 클라이언트 부가 효과
 * - OAuth 가입 성공 쿼리 처리(signup_completed 트래킹 + URL 정리)
 * - 기본 카테고리 시딩
 */
export function OnboardingPageEffects() {
  useOAuthSignupSuccess();
  useSeedInitialData();

  return null;
}
