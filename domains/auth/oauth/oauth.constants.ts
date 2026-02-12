import { SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER } from '../auth.types';

export const SOCIAL_PROVIDER_KAKAO =
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.KAKAO;
export const SOCIAL_PROVIDER_NAVER =
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.NAVER;

export const OAUTH_REDIRECT = {
  /** 기존 사용자 SNS 로그인 성공 시 홈으로 (login_completed 트래킹용 쿼리 포함) */
  SUCCESS: (provider: string) => `/?oauth_login=${provider.toLowerCase()}`,
  SUCCESS_TO_ONBOARDING: (provider: string) =>
    `/onboarding?oauth_success=${provider.toLowerCase()}`,
  FAILURE: (errorCode: string, provider?: string) =>
    `/landing?error=${errorCode}${provider ? `&provider=${provider}` : ''}`,
} as const;
