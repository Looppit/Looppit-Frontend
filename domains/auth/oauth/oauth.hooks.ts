'use client';

import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import {
  joinPathWithQuery,
  createTypeValidator,
  withoutSearchParams,
} from '@/shared/utils';

import { OAUTH_ERROR_CODES, OAuthErrorCode } from './oauth.constants';
import { getOAuthErrorMessage } from './oauth.error';

const isValid = createTypeValidator<OAuthErrorCode>(
  Object.values(OAUTH_ERROR_CODES),
);

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorCode = searchParams.get('error');
    if (!errorCode || !isValid(errorCode)) return;

    const errorMessage = getOAuthErrorMessage(errorCode);
    toast.error(errorMessage);

    const newSearchParams = withoutSearchParams(searchParams, 'error');
    const newUrl = joinPathWithQuery(pathname, newSearchParams);

    setTimeout(() => {
      router.replace(newUrl);
    }, 0);
  }, [searchParams, pathname, router]);
}
