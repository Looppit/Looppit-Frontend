import type { QueryKey } from '@tanstack/react-query';

type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>;

type QueryKeyBuilder = {
  append: (...parts: Serializable[]) => QueryKey;
  nested: (...parts: string[]) => QueryKeyBuilder;
};

export const createQueryKey = (base: readonly string[]): QueryKeyBuilder => {
  return {
    append: (...parts: Serializable[]): QueryKey =>
      [...base, ...parts] as const,
    nested: (...parts: string[]): QueryKeyBuilder =>
      createQueryKey([...base, ...parts] as const),
  };
};
