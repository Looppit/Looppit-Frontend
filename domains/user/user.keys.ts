import { createQueryKey } from '@/shared/api/utils/api.query-key';

const userBase = createQueryKey(['user']);

export const userKeys = {
  base: userBase.append(),
};
