import { useEffect, useRef, useState } from 'react';

type SwipeableHandlers = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'onTouchStart' | 'onTouchMove' | 'onTouchEnd'
>;

type swipeableProps = {
  maxSwipe: number;
  swipeBuffer: number;
};

interface SwipeableReturnTypes {
  containerRef: React.RefObject<HTMLDivElement | null>;
  offsetX: number;
  handlers: SwipeableHandlers;
  isOpened: boolean;
}

const MAX_SWIPE = -130;
const SWIPE_BUFFER = 40;

export const useSwipeable = (
  options: Partial<swipeableProps> = {},
): SwipeableReturnTypes => {
  const maxSwipe = options.maxSwipe ?? MAX_SWIPE;
  const swipeBuffer = options.swipeBuffer ?? SWIPE_BUFFER;
  const minAllowedSwipe = maxSwipe - swipeBuffer;

  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const [offsetX, setOffsetX] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startX.current = e.touches[0].clientX - offsetX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();

    const moveX = e.touches[0].clientX - startX.current;

    if (moveX <= 0 && moveX >= minAllowedSwipe) {
      setOffsetX(moveX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(false);

    if (offsetX < maxSwipe / 2) {
      setOffsetX(maxSwipe);
      setIsOpened(true);
    } else {
      setOffsetX(0);
      setIsOpened(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (!containerRef.current || !isOpened) return;

      const path = event.composedPath();

      if (path.includes(containerRef.current)) return;

      setOffsetX(0);
      setIsOpened(false);
    };

    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpened]);

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging]);

  return {
    containerRef,
    offsetX,
    isOpened,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
