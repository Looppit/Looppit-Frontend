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

/**
 * Auth 도메인 브릿지 액션 상수
 */
const ACTION_TYPE = 'USER_ACTION';
const NEXT_AUTH_OPTIONS = {
  callbackUrl: '/',
};
const BRIDGE_REQUEST_OPTIONS = {
  action: 'kakao_login',
};
const DEFAULT_ERROR_MESSAGE = '네트워크나 기타 알 수 없는 에러가 발생했습니다.';

type KakaoLoginResponse = {
  success: true;
  data: {
    providerId: number;
    email: string;
  };
};

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

  const redirectUrl = buildUrl('', '/api/auth/oauth/exchange', {
    email: result.data.email,
    providerId: result.data.providerId,
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
