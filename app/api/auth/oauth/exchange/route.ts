import { NextRequest, NextResponse } from 'next/server';

import { OAUTH_ERROR_CODES } from '@/domains/auth/oauth.constants';
import { classifyOAuthError } from '@/domains/auth/oauth.error';
import { exchangeOAuthToken } from '@/domains/auth/oauth.service';
import { parseOAuthParams } from '@/domains/auth/oauth.utils';

/**
 * OAuth 토큰 교환 API Route
 * OAuth 인증 후 토큰을 교환하고 리다이렉트합니다.
 *
 * @returns
 * 성공 시 `/oauth/bridge`로 리다이렉트
 * 에러 시 `/login?error={errorCode}`로 리다이렉트
 */
export async function GET(request: NextRequest) {
  const params = parseOAuthParams(request);

  if (!params) {
    return NextResponse.redirect(
      new URL(`/login?error=${OAUTH_ERROR_CODES.MISSING_PARAMS}`, request.url),
    );
  }

  try {
    const { redirectUrl } = await exchangeOAuthToken(params, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    const oauthError = classifyOAuthError(error);

    return NextResponse.redirect(
      new URL(`/login?error=${oauthError.code}`, request.url),
    );
  }
}
