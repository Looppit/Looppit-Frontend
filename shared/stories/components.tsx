/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictPropsWithChildren } from '@/shared/types';

import type { ArgTypes } from '@storybook/nextjs';

const createHiddenArgs = <T extends (...args: any[]) => any, K extends string>(
  component: T,
  keys: K[],
) => {
  const hiddenArg = {
    table: { disable: true },
    control: false,
  } as ArgTypes<typeof component>;

  return Object.fromEntries(keys.map((key) => [key, hiddenArg])) as Record<
    K,
    ArgTypes<typeof component>
  >;
};

const Container = ({
  children,
  className,
}: StrictPropsWithChildren & { className?: string }) => {
  return (
    <div className={`w-[400px] bg-background px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export { createHiddenArgs, Container };
