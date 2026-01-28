import { UserProfileLoading } from '@/domains/home/ui';
import { useUserProfileWithSuspense } from '@/domains/user/user.hooks';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';

import { UserProfileCard } from './user-profile-card';

export const UserGreetingContent = () => {
  const { data } = useUserProfileWithSuspense();

  return (
    <UserProfileCard
      userId={data.id}
      nickname={data.nickname}
      imagePath={data.imagePath}
    />
  );
};

export const UserGreeting = () => {
  return (
    <QueryErrorBoundary
      loadingFallback={<UserProfileLoading />}
      errorFallback={<UserProfileLoading />}
    >
      <UserGreetingContent />
    </QueryErrorBoundary>
  );
};
