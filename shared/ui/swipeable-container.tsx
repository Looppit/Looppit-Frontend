import { ReactNode } from 'react';

import { useSwipeable } from '@/shared/hooks';
import { StrictPropsWithChildren } from '@/shared/types';
import { cn } from '@/shared/utils';

const SwipeableContainer = ({
  children,
  actions,
}: StrictPropsWithChildren<{ actions: ReactNode }>) => {
  const { containerRef, handlers, offsetX } = useSwipeable();

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          'flex transition-transform duration-200 ease-out w-full touch-none',
        )}
        style={{
          transform: `translate3d(${offsetX}px, 0, 0)`,
          touchAction: 'pan-x',
        }}
        {...handlers}
      >
        {children}
        {actions}
      </div>
    </div>
  );
};

export default SwipeableContainer;
