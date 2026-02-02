'use client';

import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';

import { CategoryDetailSummary } from './category-detail-summary';

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

export const CategoryDetailLoading = () => {
  return (
    <>
      <CategoryDetailHeaderFallback />
      <CategoryDetailSummary.Skeleton />
    </>
  );
};

export const CategoryDetailNotFound = () => {
  return (
    <>
      <CategoryDetailHeaderFallback />
      <div className="text-secondary text-center typography-body-semibold py-8">
        카테고리를 찾을 수 없어요 🥹
      </div>
    </>
  );
};
