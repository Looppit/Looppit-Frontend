import { UserProfileCard } from '@/domains/home/ui';
import { useUserProfileWithSuspense } from '@/domains/user/user.hooks';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';

export const UserGreetingSectionContent = () => {
  const { data } = useUserProfileWithSuspense();

  return (
    <UserProfileCard.Root>
      <UserProfileCard.Item
        userId={data.id}
        nickname={data.nickname}
        imagePath={data.imagePath}
      />
    </UserProfileCard.Root>
  );
};

export const UserGreetingSection = () => {
  return (
    <QueryErrorBoundary
      loadingFallback={<UserProfileCard.Skeleton />}
      errorFallback={<UserProfileCard.Skeleton />}
    >
      <UserGreetingSectionContent />
    </QueryErrorBoundary>
  );
};
