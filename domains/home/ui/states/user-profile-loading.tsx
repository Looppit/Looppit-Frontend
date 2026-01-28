import { Skeleton } from '@/shared/ui/skeleton';

export const UserProfileLoading = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-9 h-9 rounded-full" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  );
};
