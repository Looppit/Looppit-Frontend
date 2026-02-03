import type { QueryClient, QueryKey } from '@tanstack/react-query';

/**
 * 서버 prefetch용 디스크립터.
 * @property queryOptions - 클라이언트와 동일한 쿼리 옵션 (queryFn은 헬퍼가 채움).
 * @property fetcher - 쿠키로 API 호출. 실패(401 등) 시 prefetch는 건너뜀(내부에서 null 처리).
 */
export type PrefetchWithCookiesDescriptor<TData = unknown> = {
  queryOptions: { queryKey: QueryKey; [key: string]: unknown };
  fetcher: (cookieHeader: string) => Promise<TData>;
};

/**
 * 쿠키 기반 fetcher들을 병렬로 호출한 뒤, 성공한 결과만 QueryClient에 prefetch합니다.
 * fetcher가 throw(401 등)한 쿼리는 prefetch를 건너뛰고 페이지는 그대로 렌더링합니다.
 */
export async function prefetchWithCookies(
  queryClient: QueryClient,
  cookieHeader: string,
  descriptors: PrefetchWithCookiesDescriptor[],
): Promise<void> {
  const results = await Promise.all(
    descriptors.map((d) =>
      Promise.resolve(d.fetcher(cookieHeader)).catch(() => null),
    ),
  );

  await Promise.all(
    descriptors
      .map((descriptor, index) => ({ descriptor, data: results[index] }))
      .filter(({ data }) => data !== null)
      .map(({ descriptor, data }) =>
        queryClient.prefetchQuery({
          ...descriptor.queryOptions,
          queryFn: () => Promise.resolve(data!),
        }),
      ),
  );
}
