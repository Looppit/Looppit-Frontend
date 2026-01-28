import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const inputVariants = cva(
  cn(
    'w-full h-14 px-5 placeholder:text-secondary/20 outline-none transition-colors typography-body-semibold rounded-small border border-white/5',
    '[&[type="password"]:not(:placeholder-shown)]:font-[Verdana]',
    '[&[type="number"]:not(:placeholder-shown)]:tracking-[4px]',
  ),
  {
    variants: {
      variant: {
        default: 'bg-card text-white focus-visible:border-primary/50',
        disabled: 'bg-card/50 cursor-default text-white/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type InputProps = React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants>;

function Input({
  className,
  disabled,
  readOnly,
  variant,
  ...props
}: InputProps) {
  const isDisabled = disabled || readOnly;
  const finalVariant = isDisabled ? 'disabled' : variant || 'default';

  return (
    <input
      data-slot="input"
      disabled={disabled}
      readOnly={readOnly}
      className={cn(inputVariants({ variant: finalVariant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
