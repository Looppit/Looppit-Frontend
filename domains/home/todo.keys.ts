import { createQueryKey } from '@/shared/api/utils/api.query-key';

const todosBase = createQueryKey(['todos']);

export const todoKeys = {
  list: (yearMonth: string) => todosBase.append('list', yearMonth),
} as const;
