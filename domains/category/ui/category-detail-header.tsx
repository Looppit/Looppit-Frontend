'use client';

import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';

export const CategoryDetailHeader = ({
  onRightClick,
}: {
  onRightClick: () => void;
}) => {
  const router = useRouter();

  return (
    <DetailHeader
      title="상세 정보"
      onLeftClick={() => router.back()}
      rightIcon="ic_more_horiz"
      onRightClick={onRightClick}
    />
  );
};

export const CategoryDetailHeaderFallback = () => {
  const router = useRouter();

  return <DetailHeader title="상세 정보" onLeftClick={() => router.back()} />;
};
