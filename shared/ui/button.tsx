import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { Icon, IconName } from '@/shared/ui/icon';
import { cn } from '@/shared/utils';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

type OutlineIconProps = {
  icon: IconName;
  bgColor: string;
  iconClassName?: string;
};

const buttonVariants = cva(
  'h-14 w-full shadow-xl flex items-center transition-all enabled:active:scale-[0.98] enabled:hover:scale-[0.98] disabled:opacity-50 rounded-small tracking-tight p-4 py-3',
  {
    variants: {
      variant: {
        default:
          'text-white bg-primary enabled:active:bg-primary/90 enabled:hover:bg-primary/90',
        secondary:
          'text-white bg-white/10 enabled:active:bg-white/5 enabled:hover:bg-white/5',
        destructive:
          'text-white bg-destructive enabled:active:bg-destructive/90 enabled:hover:bg-destructive/90',
        outline:
          'bg-card enabled:active:bg-card-lighter enabled:hover:bg-card-lighter text-white/90 border border-white/10 gap-4',
      },
      size: {
        title: 'typography-title-medium',
        body: 'typography-body-semibold',
      },
      align: {
        center: 'justify-center',
        start: 'justify-start',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'title',
      align: 'center',
    },
  },
);

const Button = ({
  className,
  variant,
  size,
  align,
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, size, align, className }))}
      {...props}
    />
  );
};

const OutlineIcon = ({ icon, iconClassName, bgColor }: OutlineIconProps) => {
  return (
    <div
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
        bgColor,
      )}
    >
      <Icon icon={icon} className={iconClassName} size="16" />
    </div>
  );
};

Button.OutlineIcon = OutlineIcon;

export { Button, buttonVariants };
