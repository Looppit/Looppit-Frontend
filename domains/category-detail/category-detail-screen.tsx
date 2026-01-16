'use client';

import { useParams, useRouter } from 'next/navigation';

import { useCategories } from '@/domains/category/hooks';
import { DetailHeader } from '@/shared/ui/detail-header';
import { Icon, IconName } from '@/shared/ui/icon';
import { getGradient } from '@/shared/utils';

const CATEGORIES: {
  title: string;
  icon: IconName;
  color: string;
  id: number;
}[] = [
  {
    title: '커리어',
    icon: 'ic_arrow_back_ios_new',
    color: '#5b13ec',
    id: 34324,
  },
];

export const CategoryDetailScreen = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: categories = [], isPending } = useCategories();
  const category = categories.find(
    ({ id: categoryId }) => categoryId === Number(id),
  );

  if (isPending) return '로딩중';

  if (!category) {
    return (
      <>
        <DetailHeader title="상세 정보" onLeftClick={() => router.back()} />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="typography-body text-secondary">
            카테고리를 찾을 수 없습니다
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <DetailHeader
        title="상세 정보"
        rightIcon="ic_more_horiz"
        onLeftClick={() => router.back()}
      />
      <div className="mt-8 flex flex-col items-center px-6 w-full">
        <div className="relative mb-8">
          <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-60"></div>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10 relative overflow-hidden ring-4 ring-background"
            style={{ background: getGradient(CATEGORIES[0].color) }}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50"></div>
            <Icon
              icon={CATEGORIES[0].icon}
              size="30"
              className="drop-shadow-lg fill-white"
            />
          </div>
        </div>
        <h2 className="typography-title-lg mb-8 tracking-tight text-white/90">
          {category.categoryName}
        </h2>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="bg-card rounded-medium p-5 border border-white/10 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg">
            <span className="text-secondary typography-body-bold uppercase opacity-60">
              아이콘
            </span>
            <div
              className="w-10 h-10 rounded-small flex items-center justify-center text-white border border-white/5 shadow-sm"
              style={{ background: getGradient(CATEGORIES[0].color) }}
            >
              <Icon
                icon={CATEGORIES[0].icon}
                size="18"
                className="drop-shadow-lg fill-white"
              />
            </div>
          </div>
          <div className="bg-card rounded-medium p-5 border border-white/10 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg">
            <span className="text-secondary typography-body-bold uppercase opacity-60">
              테마 색상
            </span>
            <div
              className="w-10 h-10 rounded-full shadow-md ring-2 ring-offset-2 ring-offset-background ring-[rgba(59,130,246,0.5)] transition-transform"
              style={{
                background: getGradient(CATEGORIES[0].color),
                borderColor: getGradient(CATEGORIES[0].color),
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
