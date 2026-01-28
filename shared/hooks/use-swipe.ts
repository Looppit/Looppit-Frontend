'use client';

import { useRef, useEffect } from 'react';

interface UseSwipeProps {
  onSwipe: (direction: 'left' | 'right') => void;
}

export function useSwipe({ onSwipe }: UseSwipeProps) {
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const onSwipeRef = useRef<typeof onSwipe>(onSwipe);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  useEffect(() => {
    const element = swipeAreaRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isSwiping.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diffX = Math.abs(e.touches[0].clientX - startX.current);
      const diffY = Math.abs(e.touches[0].clientY - startY.current);

      // 수평 스와이프가 수직보다 크면
      if (diffX > diffY && diffX > 10) {
        isSwiping.current = true;
        e.preventDefault(); // 브라우저 뒤로가기 방지
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSwiping.current) {
        const diffX = e.changedTouches[0].clientX - startX.current;

        if (diffX > 50) {
          onSwipeRef.current('left');
        } else if (diffX < -50) {
          onSwipeRef.current('right');
        }
      }

      isSwiping.current = false;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { swipeAreaRef };
}
