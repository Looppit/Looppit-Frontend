export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

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
