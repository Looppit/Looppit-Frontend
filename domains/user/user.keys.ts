import { createQueryKey } from '@/shared/lib/query';

const userBase = createQueryKey(['user']);

export const userKeys = {
  base: userBase.append(),
};
