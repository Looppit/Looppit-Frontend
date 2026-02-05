import { cache } from 'react';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { profileQueryOption } from '@/domains/user/hooks';
import { getUser } from '@/domains/user/user.api';
import { prefetchWithCookies } from '@/shared/lib/query';

/**
 * (main) 레이아웃·페이지 공통 prefetch: userProfile만 prefetch 후 dehydrate.
 * React cache()로 요청당 한 번만 실행되며, 레이아웃에서 호출해 전체 (main)에 공통 state로 사용.
 */
export const getBaseDehydratedState = cache(
  async (cookieHeader: string): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = new QueryClient();
    await prefetchWithCookies(queryClient, cookieHeader, [
      {
        queryOptions: profileQueryOption,
        fetcher: (header) => getUser({ cookieHeader: header }),
      },
    ]);
    return dehydrate(queryClient);
  },
);
