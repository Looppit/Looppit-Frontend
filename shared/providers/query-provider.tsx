'use client';

import { useState } from 'react';

import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { PROJECT_ENV } from '@/shared/constants';
import { StrictPropsWithChildren } from '@/shared/types';

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
      {PROJECT_ENV.isDevelopment && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default QueryProvider;
