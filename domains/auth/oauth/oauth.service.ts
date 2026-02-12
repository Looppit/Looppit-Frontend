'use server';

import { toOAuthError } from '@/shared/error';

import { postOAuthSignupRequest } from './oauth.api';
import { OAUTH_REDIRECT } from './oauth.constants';

import type { OAuthSignupRequest } from './oauth.api';

/**
 * OAuth 로그인 처리 (백엔드 API 호출)
 * 쿠키는 백엔드에서 자동 설정됨
 * @returns 리다이렉트 URL (기존 유저: 홈, 신규 유저: 온보딩, 실패 시 에러 페이지)
 */
export const processOAuthLogin = async (
  params: OAuthSignupRequest,
): Promise<string> => {
  try {
    const { result } = await postOAuthSignupRequest(params);
    return result.isNewMember
      ? OAUTH_REDIRECT.SUCCESS_TO_ONBOARDING(params.provider)
      : OAUTH_REDIRECT.SUCCESS(params.provider);
  } catch (error) {
    const oauthError = toOAuthError(error);
    const providerLower = params.provider?.toLowerCase();
    return OAUTH_REDIRECT.FAILURE(oauthError.code, providerLower);
  }
};
