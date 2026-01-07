'use server';

import { postOAuthSignupRequest } from './oauth.api';
import { OAUTH_REDIRECT } from './oauth.constants';
import { classifyOAuthError } from './oauth.error';

import type { OAuthSignupRequest } from './oauth.api';

/**
 * OAuth 로그인 처리 (백엔드 API 호출)
 * 쿠키는 백엔드에서 자동 설정됨
 * @returns 리다이렉트 URL (성공 시 홈, 실패 시 에러 페이지)
 */
export const processOAuthLogin = async (
  params: OAuthSignupRequest,
): Promise<string> => {
  try {
    await postOAuthSignupRequest(params);
    return OAUTH_REDIRECT.SUCCESS;
  } catch (error) {
    const oauthError = classifyOAuthError(error);
    return OAUTH_REDIRECT.FAILURE(oauthError.code);
  }
};
