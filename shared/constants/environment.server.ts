import { validateEnv } from '@/shared/utils/env';

const envs = {
  oauth: {
    nextauth: {
      secret: process.env.AUTH_SECRET,
      baseUrl: process.env.AUTH_URL,
    },
    kakao: {
      id: process.env.AUTH_KAKAO_ID,
      secret: process.env.AUTH_KAKAO_SECRET,
    },
    naver: {
      id: process.env.AUTH_NAVER_ID,
      secret: process.env.AUTH_NAVER_SECRET,
    },
  },
} as const;

export const PROJECT_PRIVATE_ENV = validateEnv({
  ...envs.oauth,
});
