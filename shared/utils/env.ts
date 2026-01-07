export const validateEnv = <T extends Record<string, unknown>>(env: T): T => {
  const missingEntry = Object.entries(env).find(
    ([, value]) => value === undefined,
  );

  if (missingEntry) {
    throw new Error(`환경 변수 ${missingEntry[0]}가 설정되지 않았습니다.`);
  }

  return env;
};
