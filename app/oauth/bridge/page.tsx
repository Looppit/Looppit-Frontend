'use client';

import { Suspense, useLayoutEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { OAUTH_ERROR_CODES } from '@/domains/auth/oauth';
import { useSetTokenAtom } from '@/shared/store/auth.atom';

/**
 * OAuth 브릿지 페이지
 *
 * OAuth 인증 완료 후 토큰을 받아서 처리하는 페이지입니다.
 * 토큰이 없는 경우 에러 쿼리 파라미터와 함께 로그인 페이지로 리다이렉트합니다.
 * 로그인 페이지에서 에러 메시지를 처리합니다.
 */
function OauthBridgeHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useSetTokenAtom();

  useLayoutEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (!accessToken) {
      router.replace(`/login?error=${OAUTH_ERROR_CODES.MISSING_TOKEN}`);
      return;
    }

    setToken(accessToken);
    router.replace('/');
  }, [searchParams, setToken, router]);

  return null;
}

export default function OauthBridgePage() {
  return (
    <Suspense fallback={null}>
      <OauthBridgeHandler />
    </Suspense>
  );
}
