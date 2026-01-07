import { JotaiProvider } from '@/shared/providers/jotai-provider';
import { NextAuthSessionProvider } from '@/shared/providers/next-auth-provider';
import QueryProvider from '@/shared/providers/query-provider';
import { StrictPropsWithChildren } from '@/shared/types/components';

const Providers = ({ children }: StrictPropsWithChildren) => {
  return (
    <NextAuthSessionProvider>
      <JotaiProvider>
        <QueryProvider>{children}</QueryProvider>
      </JotaiProvider>
    </NextAuthSessionProvider>
  );
};

export default Providers;
