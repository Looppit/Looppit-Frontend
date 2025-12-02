'use client';

import { IS_DEVELOPMENT } from '@/shared/constants';
import { StrictPropsWithChildren } from '@/shared/types';
import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 1,
      retryDelay: (attemptIndex: number) => {
        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
    },
    mutations: {
      retry: 0,
    },
  },
};

const QueryProvider = ({ children }: StrictPropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default QueryProvider;
