'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { trackEvent } from '@/shared/lib/posthog';
import {
  joinPathWithQuery,
  createTypeValidator,
  withoutSearchParams,
} from '@/shared/utils';

import { type SocialProvider, SOCIAL_PROVIDERS } from '../auth.types';
import { OAUTH_ERROR_CODES, OAuthErrorCode } from './oauth.constants';
import { getOAuthErrorMessage } from './oauth.error';

const isValid = createTypeValidator<OAuthErrorCode>(
  Object.values(OAUTH_ERROR_CODES),
);

const isOAuthProviderValue =
  createTypeValidator<SocialProvider>(SOCIAL_PROVIDERS);

/**
 * OAuth 가입 성공 처리 훅
 *
 * 쿼리 파라미터에서 oauth_success를 확인하고,
 * SNS 가입 성공 시 signup_completed 트래킹 후 쿼리 파라미터를 제거합니다.
 *
 * @description
 * - 온보딩 페이지에서 웹/앱 SNS 가입 성공 리다이렉트를 처리합니다.
 * - oauth_success가 소셜 provider일 때 트래킹 후 URL에서 파라미터를 제거합니다.
 */
export function useOAuthSignupSuccess() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const oauthSuccess = searchParams.get('oauth_success');
    if (!oauthSuccess || !isOAuthProviderValue(oauthSuccess)) return;

    trackEvent('signup_completed', { method: oauthSuccess });

    const newSearchParams = withoutSearchParams(searchParams, 'oauth_success');
    const newUrl = joinPathWithQuery(pathname, newSearchParams);

    window.history.replaceState(null, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
}

/**
 * OAuth 로그인 성공 처리 훅
 *
 * 쿼리 파라미터에서 oauth_login을 확인하고,
 * 기존 사용자 SNS 로그인 성공 시 login_completed 트래킹 후 쿼리 파라미터를 제거합니다.
 *
 * @description
 * - 홈(/) 등으로 리다이렉트된 뒤 oauth_login이 소셜 provider일 때 트래킹 후 URL에서 파라미터를 제거합니다.
 */
export function useOAuthLoginSuccess() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const oauthLogin = searchParams.get('oauth_login');
    if (!oauthLogin || !isOAuthProviderValue(oauthLogin)) return;

    trackEvent('login_completed', { method: oauthLogin });

    const newSearchParams = withoutSearchParams(searchParams, 'oauth_login');
    const newUrl = joinPathWithQuery(pathname, newSearchParams);

    window.history.replaceState(null, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
}

/**
 * OAuth 에러 처리 훅
 *
 * 쿼리 파라미터에서 OAuth 에러 코드를 확인하고,
 * 에러가 있는 경우 사용자에게 toast로 메시지를 표시합니다.
 *
 * @description
 * - 로그인 페이지에서 OAuth 브릿지 페이지로부터 전달된 에러를 처리합니다.
 * - 에러 코드가 쿼리 파라미터로 전달되면 자동으로 toast를 표시합니다.
 * - 에러 메시지 표시 후 쿼리 파라미터를 제거하여 중복 표시를 방지합니다.
 */
export function useOAuthError() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorCode = searchParams.get('error');
    if (!errorCode || !isValid(errorCode)) return;

    const errorMessage = getOAuthErrorMessage(errorCode);
    const provider = searchParams.get('provider');

    if (!provider || !isOAuthProviderValue(provider)) return;

    trackEvent('oauth_error_occurred', {
      provider,
      error_code: errorCode,
      error_message: errorMessage,
      pathname,
    });
    trackEvent('signup_failed', {
      method: provider,
      error_code: errorCode,
    });

    toast.error(errorMessage);

    const newSearchParams = withoutSearchParams(searchParams, [
      'error',
      'provider',
    ]);
    const newUrl = joinPathWithQuery(pathname, newSearchParams);

    window.history.replaceState(null, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
}
