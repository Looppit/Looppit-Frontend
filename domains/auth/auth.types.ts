export const ACCOUNT_PROVIDERS = ['KAKAO', 'NAVER'] as const;

/** next-auth provider id (소문자) */
export const SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER = {
  KAKAO: 'kakao',
  NAVER: 'naver',
} as const;

export const SOCIAL_PROVIDERS = [
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.KAKAO,
  SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.NAVER,
] as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

/** next-auth provider id(소문자) → 서버 전송용 provider(대문자) */
export const ACCOUNT_PROVIDER_BY_SOCIAL_PROVIDER_ID = {
  [SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.KAKAO]: 'KAKAO',
  [SOCIAL_PROVIDER_ID_BY_ACCOUNT_PROVIDER.NAVER]: 'NAVER',
} as const satisfies Record<SocialProvider, (typeof ACCOUNT_PROVIDERS)[number]>;
