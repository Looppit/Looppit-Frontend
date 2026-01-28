import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const skeletonVariants = cva(
  'animate-pulse bg-white-softer rounded-[4px] w-full',
  {
    variants: {
      variant: {
        default: 'bg-card-lighter',
      },
      size: {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type SkeletonProps = React.ComponentProps<'div'> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant, size, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
