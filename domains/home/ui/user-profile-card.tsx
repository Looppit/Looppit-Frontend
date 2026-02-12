import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/domains/user/user.types';
import { ASSET_URL } from '@/shared/constants';
import { StrictPropsWithChildren } from '@/shared/types';
import { Skeleton } from '@/shared/ui/skeleton';

const UserProfileCardRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex items-center justify-between w-full gap-3.5">
      {children}
    </div>
  );
};

const UserProfileCardRow = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex-1">{children}</div>;
};

type UserProfileCardItemProps = Pick<User, 'nickname' | 'imgPath' | 'content'>;

const UserProfileCardItem = ({
  nickname,
  imgPath,
  content,
}: UserProfileCardItemProps) => {
  return (
    <>
      <Link
        href="/profile"
        className="size-9 rounded-full overflow-hidden border border-white/10 active:scale-95 transition-transform"
      >
        <Image
          className="w-full h-full object-cover"
          alt="Avatar"
          src={imgPath || ASSET_URL.DEFAULT_IMAGE}
          width={36}
          height={36}
        />
      </Link>
      <UserProfileCardRow>
        <h1 className="typography-title-medium">
          {nickname}님, 오늘도 반가워요
        </h1>
        <p className="text-secondary/80 typography-caption-medium">
          {content ?? '작은 성취가 모여 큰 변화를 만들어요'}
        </p>
      </UserProfileCardRow>
    </>
  );
};

const UserProfileCardSkeleton = () => {
  return (
    <UserProfileCardRoot>
      <Skeleton className="w-9 h-9 rounded-full" />
      <UserProfileCardRow>
        <Skeleton className="w-3/4 h-4 mb-2" />
        <Skeleton className="w-1/2 h-4" />
      </UserProfileCardRow>
    </UserProfileCardRoot>
  );
};

const UserProfileCard = Object.assign(UserProfileCardRoot, {
  Root: UserProfileCardRoot,
  Item: UserProfileCardItem,
  Skeleton: UserProfileCardSkeleton,
});

export { UserProfileCard };
