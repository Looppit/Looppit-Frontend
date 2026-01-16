'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useCategories } from '@/domains/category/hooks';
import { DetailHeader } from '@/shared/ui/detail-header';
import { Icon } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { getGradient } from '@/shared/utils';

export const CategoryScreen = () => {
  const router = useRouter();
  const { data: categories, isPending } = useCategories();

  const handleCreateCategory = () => {
    router.push('/category/add');
  };

  if (isPending) {
    return '로딩중';
  }

  if (!categories || categories.length === 0) {
    return (
      <>
        <DetailHeader title="카테고리 관리" onLeftClick={() => router.back()} />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="typography-body text-secondary">카테고리가 없습니다</p>
        </div>
        <IconButton
          icon="ic_add"
          size="40"
          className="fixed bottom-[100px] right-4 bg-primary text-white"
          iconClassName="fill-current"
          onClick={handleCreateCategory}
        />
      </>
    );
  }

  return (
    <>
      <DetailHeader title="카테고리 관리" onLeftClick={() => router.back()} />

      <div className="grid grid-cols-3 gap-3 px-5">
        {categories.map(
          ({ id, categoryName, categoryIconName, categoryColor }) => {
            return (
              <div key={id} className="cursor-pointer group pt-[100%] relative">
                <Link
                  href={`category/${id}`}
                  className="absolute inset-0 size-full bg-card rounded-medium p-1 flex flex-col items-center justify-center gap-2 hover:bg-card-lighter border border-white-soft transition-all shadow-lg"
                >
                  <div
                    className="size-10 rounded-small flex items-center justify-center text-white mb-1 shadow-sm"
                    style={{
                      background: getGradient(categoryColor),
                    }}
                  >
                    <Icon
                      icon={categoryIconName}
                      size="18"
                      className="fill-current"
                    />
                  </div>
                  <span className="typography-caption-bold text-secondary text-center px-1 truncate w-full tracking-tight">
                    {categoryName}
                  </span>
                </Link>
              </div>
            );
          },
        )}
      </div>
      <IconButton
        icon="ic_add"
        size="40"
        className="fixed bottom-[100px] right-4 bg-primary text-white"
        iconClassName="fill-current"
        onClick={handleCreateCategory}
      />
    </>
  );
};
