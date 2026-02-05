import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { ACCOUNT_PROVIDER_BY_SOCIAL_PROVIDER_ID } from '@/domains/auth/auth.types';
import { processOAuthLogin } from '@/domains/auth/oauth/oauth.service';
import {
  getKakaoErrorMessage,
  handleOauthError,
} from '@/domains/auth/oauth/oauth.utils';
import { bridgeRequest, platformHandler } from '@/shared/utils';

import { BRIDGE_REQUEST_OPTIONS, KAKAO_ERROR_CODE } from './kakao.constants';
import {
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
} from './oauth.constants';

import type { KakaoLoginResponse } from './oauth.types';

export const ACTION_TYPE = 'USER_ACTION' as const;

/** 실제 리다이렉트 URL은 processOAuthLogin 반환값으로 결정됨 */
const NEXT_AUTH_OPTIONS = {
  callbackUrl: '/',
} as const;

/**
 * NextAuth를 통한 소셜 로그인을 처리합니다.
 */
const signInWithProvider = async (provider: string) => {
  await signIn(provider, NEXT_AUTH_OPTIONS);
};

/**
 * 카카오 앱 로그인 처리
 * 브릿지를 통해 네이티브 앱에 카카오 로그인 요청 후 리다이렉트
 */
const handleKakaoAppLogin = async () => {
  const result = await bridgeRequest<KakaoLoginResponse>(
    ACTION_TYPE,
    BRIDGE_REQUEST_OPTIONS,
  );

  if (!result.success) {
    const errorCode = result.error;
    const isCancelled = errorCode === KAKAO_ERROR_CODE.CANCELLED;

    if (!isCancelled) {
      const errorMessage = getKakaoErrorMessage(errorCode!);
      toast.error(errorMessage);
    }
    return;
  }

  const { email, providerId } = result.data;

  const redirectUrl = await processOAuthLogin({
    email,
    providerId: String(providerId),
    provider: ACCOUNT_PROVIDER_BY_SOCIAL_PROVIDER_ID[SOCIAL_PROVIDER_KAKAO],
  });

  window.location.href = redirectUrl;
};

/**
 * 카카오 로그인 처리
 * - 앱: 브릿지를 통해 네이티브 앱에 카카오 로그인 요청
 * - 웹: NextAuth를 통해 카카오 OAuth 로그인 진행
 */
export const handleKakaoLogin = async () => {
  try {
    await platformHandler()
      .app(handleKakaoAppLogin)
      .web(() => signInWithProvider(SOCIAL_PROVIDER_KAKAO))
      .execute();
  } catch (error) {
    handleOauthError(error);
  }
};

/**
 * 네이버 로그인 처리
 * - 웹: NextAuth를 통해 네이버 OAuth 로그인 진행
 */
export const handleNaverLogin = async () => {
  try {
    await signInWithProvider(SOCIAL_PROVIDER_NAVER);
  } catch (error) {
    handleOauthError(error);
  }
};
