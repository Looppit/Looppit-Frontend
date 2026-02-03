import { createQueryKey } from '@/shared/lib/query';

const todosBase = createQueryKey(['todos']);

export const todoKeys = {
  list: (yearMonth: string) => todosBase.append('list', yearMonth),
} as const;
