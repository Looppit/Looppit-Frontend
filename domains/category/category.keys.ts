import { createQueryKey } from '@/shared/api/utils/api.query-key';

const categoriesBase = createQueryKey(['categories']);

export const categoryKeys = {
  list: () => categoriesBase.append('list'),
} as const;
