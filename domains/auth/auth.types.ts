export const ACCOUNT_PROVIDERS = ['KAKAO', 'NAVER'] as const;

export type AccountProvider = (typeof ACCOUNT_PROVIDERS)[number];

/** next-auth provider id (소문자) */
export const SOCIAL_PROVIDERS = ['kakao', 'naver'] as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];
