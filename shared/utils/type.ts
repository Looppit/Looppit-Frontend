export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export const createTypeValidator = <T extends string>(
  validValues: readonly T[],
): ((value: string) => value is T) => {
  return (value: string): value is T => {
    return validValues.includes(value as T);
  };
};
