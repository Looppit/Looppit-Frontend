import { Icon } from '@/shared/ui/icon';

function CompletedStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-150"></div>
        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-primary/40">
          <Icon icon="ic_wand" className="w-12 h-12 fill-white" />
        </div>
      </div>
      <h2 className="text-[22px] font-bold mb-4 tracking-tight">
        이제, 루핏을 이용할 수 있어요
      </h2>
      <p className="text-secondary/70 text-[15px] font-medium leading-relaxed">
        오늘 할 일을 기록하고, 하나씩 실행해 보세요
        <br />
        작은 반복이 습관이 돼요
      </p>
    </div>
  );
}

export { CompletedStep };
