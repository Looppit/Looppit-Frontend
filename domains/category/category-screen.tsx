'use client';

import { useRouter } from 'next/navigation';

import { CategoryCreateButton, CategoryList } from '@/domains/category/ui';
import { DetailHeader } from '@/shared/ui/detail-header';

export const CategoryScreen = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <DetailHeader title="카테고리 관리" onLeftClick={() => router.back()} />
      <CategoryList />
      <CategoryCreateButton />
    </div>
  );
};
