import { PROJECT_ENV } from '@/shared/constants';

const validateEnv = (): typeof PROJECT_ENV => {
  const missingKey = Object.entries(PROJECT_ENV).find(
    ([, value]) => value === undefined,
  );

  if (missingKey) {
    throw new Error(`환경 변수 ${missingKey}가 설정되지 않았습니다.`);
  }

  return PROJECT_ENV;
};

export const ENV_CONFIG = validateEnv();
