export const ACCOUNT_PROVIDERS = ['GOOGLE', 'KAKAO', 'NAVER'] as const;

export type AccountProvider = (typeof ACCOUNT_PROVIDERS)[number];
