import { createQueryKey } from '@/shared/lib/query';

const todosBase = createQueryKey(['todos']);

export const todoKeys = {
  base: todosBase,
  list: (yearMonth: string) => todosBase.append('list', yearMonth),
} as const;
