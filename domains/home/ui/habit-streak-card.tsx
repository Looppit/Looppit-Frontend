import { StrictPropsWithChildren } from '@/shared/types';
import { Icon } from '@/shared/ui/icon';
import { Skeleton } from '@/shared/ui/skeleton';

const HabitStreakCardRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="bg-card p-4 px-6 rounded-small flex items-center justify-between border border-white-soft shadow-lg relative overflow-hidden w-full">
      {children}
    </div>
  );
};

const HabitStreakCardContent = ({
  continuousDays,
}: {
  continuousDays: number;
}) => {
  return (
    <>
      <div className="relative z-10">
        <h2 className="text-white typography-body-semibold text-base">
          {continuousDays > 0
            ? `${continuousDays}일째 습관 이어가는 중`
            : '매일 작성하고 꾸준함을 이뤄내요'}
        </h2>
        <p className="typography-caption-medium font-medium mt-0.5 opacity-70">
          오늘도 가볍게 시작해볼까요?
        </p>
      </div>
      <Icon
        icon="ic_local_fire_department_fill"
        size="30"
        className="fill-orange-500"
      />
    </>
  );
};

const HabitStreakCardSkeleton = () => {
  return (
    <HabitStreakCardRoot>
      <div className="relative z-10 flex flex-col gap-1">
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="size-[30px] rounded-small" />
    </HabitStreakCardRoot>
  );
};

const HabitStreakCard = Object.assign(HabitStreakCardRoot, {
  Root: HabitStreakCardRoot,
  Content: HabitStreakCardContent,
  Skeleton: HabitStreakCardSkeleton,
});

export { HabitStreakCard };
