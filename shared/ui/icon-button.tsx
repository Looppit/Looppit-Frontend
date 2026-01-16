import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { Icon, IconName, IconSize } from '@/shared/ui/icon';
import { cn } from '@/shared/utils';

export type IconButtonSize = '28' | '36' | '40';

const iconButtonVariants: Record<
  IconButtonSize,
  { iconSize: IconSize; className: string }
> = {
  '28': {
    iconSize: '24',
    className: 'size-[28px]',
  },
  '36': {
    iconSize: '18',
    className: 'size-[36px]',
  },
  '40': {
    iconSize: '24',
    className: 'size-[40px]',
  },
};

type ButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
  icon: IconName;
  iconClassName?: string;
  size: IconButtonSize;
};

const IconButton = ({
  className,
  icon,
  iconClassName,
  size = '28',
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      type={type}
      className={cn(
        'rounded-full transition-all active:scale-90 border shadow-sm bg-card border-white-soft',
        iconButtonVariants[size].className,
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={iconClassName}
        size={iconButtonVariants[size].iconSize}
      />
    </Comp>
  );
};

export { IconButton };
