import { validateEnv } from '@/shared/utils/env';

const envs = {
  node: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
  urls: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_BASE_URL,
    clientBaseUrl: process.env.NEXT_PUBLIC_API_CLIENT_BASE_URL,
  },
} as const;

export const PROJECT_ENV = validateEnv({
  ...envs.urls,
  ...envs.node,
});
