import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const chipVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-full border px-4 py-2 bg-white-softer border-white-softer w-fit whitespace-nowrap',
    '[&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'overflow-hidden transition-all active:scale-95 hover:bg-white/10 shrink-0',
  ),
  {
    variants: {
      variant: {
        default: 'text-white/80',
        ghost: 'text-secondary/60',
      },
      size: {
        sm: 'px-[14px] pb-[5px] pt-[7px] typography-caption-bold',
        md: 'px-[14px] pb-[7px] pt-[9px] typography-body-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

function Chip({
  className,
  variant,
  size,
  themeColor,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
    themeColor?: string;
  }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(chipVariants({ variant, size }), className)}
      style={{
        ...(themeColor && {
          borderColor: themeColor,
          color: themeColor,
        }),
      }}
      {...props}
    />
  );
}

export { Chip, chipVariants };
