'use client';

import { Component, type ReactNode, Suspense } from 'react';

import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export type ErrorBoundaryProps = {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type ErrorBoundaryComponentProps = Pick<
  ErrorBoundaryProps,
  'errorFallback' | 'onError'
> & {
  children: ReactNode;
  onReset?: () => void;
};

class ErrorBoundaryComponent extends Component<
  ErrorBoundaryComponentProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryComponentProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const { errorFallback } = this.props;

      if (errorFallback) {
        return typeof errorFallback === 'function'
          ? errorFallback(this.state.error, this.reset)
          : errorFallback;
      }

      return (
        <div className="text-center py-8 px-4">
          <div className="text-secondary text-center py-8 flex flex-col gap-4">
            <p className="typography-title-medium">
              일시적인 오류로 화면을 불러오지 못했어요 🥹
            </p>
            <p className="typography-body-semibold">
              다시 시도하거나 안전한 화면으로 이동할 수 있어요.
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={this.reset} variant="secondary">
              다시 시도 하기
            </Button>
            <Button asChild variant="outline">
              <Link href="/">홈으로</Link>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Suspense와 ErrorBoundary를 함께 사용하는 코어 컴포넌트
 * TanStack Query 의존성 없이 순수 React 기능만 사용
 *
 * @example 기본 사용
 * ```tsx
 * <ErrorBoundary loadingFallback={<Loading />}>
 *   <SuspenseComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example 커스텀 에러 UI 및 reset 로직
 * ```tsx
 * <ErrorBoundary
 *   loadingFallback={<Loading />}
 *   errorFallback={(error, reset) => (
 *     <ErrorView error={error} onRetry={reset} />
 *   )}
 *   onReset={() => {}}
 * >
 *   <SuspenseComponent />
 * </ErrorBoundary>
 * ```
 */
export const ErrorBoundary = ({
  children,
  loadingFallback,
  errorFallback,
  onError,
  onReset,
}: ErrorBoundaryProps) => {
  return (
    <ErrorBoundaryComponent
      errorFallback={errorFallback}
      onError={onError}
      onReset={onReset}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundaryComponent>
  );
};
