import { signIn } from 'next-auth/react';

import {
  SOCIAL_PROVIDER_GOOGLE,
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
} from '@/domains/auth';
import {
  bridgeRequest,
  buildUrl,
  getErrorMessage,
  platformHandler,
} from '@/shared/utils';

import {
  ACTION_TYPE,
  BRIDGE_REQUEST_OPTIONS,
  DEFAULT_ERROR_MESSAGE,
  KAKAO_ERROR_CODE,
  NEXT_AUTH_OPTIONS,
} from './constants';
import { getKakaoErrorMessage } from './ui/social-login.utils';

import type { KakaoLoginResponse } from './login.types';

/**
 * 에러를 처리하고 사용자에게 알림을 표시합니다.
 */
const handleError = (error: unknown) => {
  const errorMessage = getErrorMessage(error, DEFAULT_ERROR_MESSAGE);
  alert(errorMessage);
};

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
      alert(errorMessage);
    }
    return;
  }

  const { email, providerId } = result.data;
  const redirectUrl = buildUrl('', '/api/auth/oauth/exchange', {
    email,
    providerId,
    provider: 'kakao',
  });

  window.location.href = redirectUrl;
};

/**
 * Google 로그인 처리
 * - 웹: NextAuth를 통해 Google OAuth 로그인 진행
 */
export const handleGoogleLogin = async () => {
  try {
    await signInWithProvider(SOCIAL_PROVIDER_GOOGLE);
  } catch (error) {
    handleError(error);
  }
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
    handleError(error);
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
    handleError(error);
  }
};
