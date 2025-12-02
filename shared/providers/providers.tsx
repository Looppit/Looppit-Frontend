import QueryProvider from '@/shared/providers/query-provider';
import { StrictPropsWithChildren } from '@/shared/types/components';

const Providers = ({ children }: StrictPropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
