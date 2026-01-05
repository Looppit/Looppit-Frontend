export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const OAUTH = {
  NEXT_AUTH: {
    SECRET: process.env.AUTH_SECRET,
    BASE_URL: process.env.AUTH_URL,
  },
  GOOGLE: {
    ID: process.env.AUTH_GOOGLE_ID,
    SECRET: process.env.AUTH_GOOGLE_SECRET,
  },
  KAKAO: {
    ID: process.env.AUTH_KAKAO_ID,
    SECRET: process.env.AUTH_KAKAO_SECRET,
  },
  NAVER: {
    ID: process.env.AUTH_NAVER_ID,
    SECRET: process.env.AUTH_NAVER_SECRET,
  },
};

const URL = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export const ENVS = {
  ...OAUTH,
  ...URL,
};
export const envs = {
  node: {
    isDevelopment: IS_DEVELOPMENT,
    isProduction: IS_PRODUCTION,
  },
  urls: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_BASE_URL!,
  },
} as const;

export const PROJECT_ENV = {
  ...envs.urls,
  ...envs.node,
} as const;
