/**
 * 타이머를 세팅하고, 시간을 반환하는 훅
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import { formatTime } from '@/shared/utils/time-format';

export function useTimer(
  initialTime: number = 60,
  format: 'mm:ss' | 'ss' = 'mm:ss',
) {
  const initialTimeRef = useRef<number>(initialTime);
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timeRef = useRef<number>(time);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTime(initialTimeRef.current);
    }

    timerRef.current = setInterval(() => {
      if (timeRef.current <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setIsRunning(false);
        return;
      }

      timeRef.current -= 1;
      setTime((prev) => prev - 1);
    }, 1000);
    setIsRunning(true);
  }, [initialTimeRef]);

  const endTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      setTime(initialTimeRef.current);

      timeRef.current = initialTimeRef.current;
    }
  }, [initialTimeRef]);

  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  return {
    time,
    isRunning,
    formattedTime: formatTime(time, format),
    startTimer,
    endTimer,
  };
}
