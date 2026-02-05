import Link from 'next/link';

import { UserProfileCard } from '@/domains/home/ui';
import { useGetUserWithSuspense } from '@/domains/user/hooks';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';

export const UserGreetingSectionContent = () => {
  const { data } = useGetUserWithSuspense();

  return (
    <Link href="/profile">
      <UserProfileCard.Root>
        <UserProfileCard.Item
          nickname={data.nickname}
          imgPath={data.imgPath}
          content={data.content}
        />
      </UserProfileCard.Root>
    </Link>
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
