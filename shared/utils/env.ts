type NarrowEnv<T> =
  T extends Record<string, unknown>
    ? { [K in keyof T]: NarrowEnv<T[K]> }
    : T extends string | undefined
      ? string
      : T;

export function validateEnv<T extends Record<string, unknown>>(
  env: T,
): NarrowEnv<T> {
  const missing = Object.entries(env).find(([, v]) => v === undefined);
  if (missing)
    throw new Error(`환경 변수 ${missing[0]}가 설정되지 않았습니다.`);
  return env as NarrowEnv<T>;
}
