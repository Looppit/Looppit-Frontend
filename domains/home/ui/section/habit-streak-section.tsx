import { useMemo } from 'react';

import { useTodosWithSuspense } from '@/domains/home/hooks';
import { HabitStreakCard } from '@/domains/home/ui';
import { getContinuousDays } from '@/domains/home/utils';
import dayjs from '@/shared/lib/dayjs';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';

const HabitStreakSectionContent = () => {
  const yearMonth = dayjs().format('YYYY-MM');
  const { data } = useTodosWithSuspense(yearMonth);

  const allDates = useMemo(() => {
    return new Set(
      data.flatMap((todos) => todos.todo.map((todo) => todo.date)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  const continuousDays = getContinuousDays(allDates);

  return (
    <HabitStreakCard.Root>
      <HabitStreakCard.Content continuousDays={continuousDays} />
    </HabitStreakCard.Root>
  );
};

export const HabitStreakSection = () => {
  return (
    <QueryErrorBoundary
      loadingFallback={<HabitStreakCard.Skeleton />}
      errorFallback={<HabitStreakCard.Skeleton />}
    >
      <HabitStreakSectionContent />
    </QueryErrorBoundary>
  );
};
