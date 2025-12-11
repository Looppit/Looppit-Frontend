import { PROJECT_ENV } from '@/shared/constants';

const validateEnv = (): typeof PROJECT_ENV => {
  const missingKey = Object.entries(PROJECT_ENV).some(
    ([, value]) => value === undefined,
  );

  if (missingKey) {
    throw new Error(`환경 변수 ${missingKey}가 설정되지 않았습니다.`);
  }

  return PROJECT_ENV;
};

const VALIDATED_PROJECT_ENV = validateEnv();

/**
 * 프로젝트 설정 정보를 반환하는 유틸리티 함수
 * @returns 프로젝트 설정 객체
 */
export const getProjectConfig = () => {
  return VALIDATED_PROJECT_ENV;
};
