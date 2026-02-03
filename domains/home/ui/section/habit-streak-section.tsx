import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { useTodosWithSuspense } from '@/domains/home/hooks';
import { todoYearMonthAtom } from '@/domains/home/store';
import { HabitStreakCard } from '@/domains/home/ui';
import { getCompletedTodoDates, getContinuousDays } from '@/domains/home/utils';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';

const HabitStreakSectionContent = () => {
  const yearMonth = useAtomValue(todoYearMonthAtom);
  const { data } = useTodosWithSuspense(yearMonth);

  const continuousDays = useMemo(
    () => getContinuousDays(getCompletedTodoDates(data)),
    [data],
  );

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
