import { createQueryKey } from '@/shared/lib/query';

const categoriesBase = createQueryKey(['categories']);

export const categoryKeys = {
  list: () => categoriesBase.append('list'),
} as const;
