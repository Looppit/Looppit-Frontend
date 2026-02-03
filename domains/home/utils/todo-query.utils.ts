import { todoKeys } from '../todo.keys';

import type { QueryClient } from '@tanstack/react-query';

export const invalidateTodoListQueries = (
  queryClient: QueryClient,
  yearMonth: string,
) => {
  queryClient.invalidateQueries({
    queryKey: todoKeys.list(yearMonth),
    refetchType: 'all',
  });
};
