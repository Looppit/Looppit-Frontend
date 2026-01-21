'use client';

import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';

import { ErrorBoundary, type ErrorBoundaryProps } from './error-boundary';

type QueryErrorBoundaryProps = Omit<ErrorBoundaryProps, 'onReset'> & {
  /**
   * TanStack Query의 에러 상태도 함께 리셋할지 여부
   * @default true
   */
  resetQueryOnError?: boolean;
};

const QueryErrorBoundaryContent = ({
  children,
  loadingFallback,
  errorFallback,
  onError,
  resetQueryOnError = true,
}: QueryErrorBoundaryProps) => {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      loadingFallback={loadingFallback}
      errorFallback={errorFallback}
      onError={onError}
      onReset={resetQueryOnError ? resetQueryError : undefined}
    >
      {children}
    </ErrorBoundary>
  );
};

/**
 * TanStack Query와 함께 사용하는 ErrorBoundary
 * QueryErrorResetBoundary로 감싸져 있어 쿼리 에러 상태가 자동으로 리셋됨
 *
 * @example 기본 사용
 * ```tsx
 * <QueryErrorBoundary loadingFallback={<Loading />}>
 *   <SuspenseQueryComponent />
 * </QueryErrorBoundary>
 * ```
 *
 * @example 커스텀 에러 UI
 * ```tsx
 * <QueryErrorBoundary
 *   loadingFallback={<Loading />}
 *   errorFallback={(error, reset) => (
 *     <ErrorView error={error} onRetry={reset} />
 *   )}
 * >
 *   <SuspenseQueryComponent />
 * </QueryErrorBoundary>
 * ```
 *
 * 재시도 시:
 * - TanStack Query의 에러 상태가 자동으로 리셋됨 (resetQueryOnError가 true일 때)
 * - ErrorBoundary가 리셋되어 Suspense가 다시 트리거됨
 * - 로딩 상태가 표시됨
 */
export const QueryErrorBoundary = ({
  children,
  ...props
}: QueryErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      <QueryErrorBoundaryContent {...props}>
        {children}
      </QueryErrorBoundaryContent>
    </QueryErrorResetBoundary>
  );
};
