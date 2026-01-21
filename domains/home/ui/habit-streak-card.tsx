import { Icon } from '@/shared/ui/icon';

export const HabitStreakCard = () => {
  return (
    <div className="bg-card p-4 px-6 rounded-small flex items-center justify-between border border-white-soft shadow-lg relative overflow-hidden w-full">
      <div className="relative z-10">
        <h2 className="text-white typography-body-semibold text-base">
          5일째 습관 이어가는 중
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
    </div>
  );
};
