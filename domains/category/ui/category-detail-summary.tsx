'use client';

import type { Category } from '@/domains/category/types';
import type { StrictPropsWithChildren } from '@/shared/types/components';
import { Icon } from '@/shared/ui/icon';
import { Skeleton } from '@/shared/ui/skeleton';
import { getGradient } from '@/shared/utils';

const CategoryDetailSummaryRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="mt-8 flex flex-col items-center px-6 w-full">
      {children}
    </div>
  );
};

const CategoryDetailSummaryIconSection = ({
  category,
}: {
  category: Category;
}) => {
  const gradient = getGradient(category.categoryColor);
  return (
    <div className="relative mb-8">
      <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-60" />
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10 relative overflow-hidden ring-4 ring-background"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50" />
        <Icon
          icon={category.categoryIconName}
          size="30"
          className="drop-shadow-lg fill-white"
        />
      </div>
    </div>
  );
};

const CategoryDetailSummaryTitleSection = ({
  category,
}: {
  category: Category;
}) => {
  return (
    <h2 className="typography-title-lg mb-8 tracking-tight text-white/90">
      {category.categoryName}
    </h2>
  );
};

const CategoryDetailSummaryGridSection = ({
  children,
}: StrictPropsWithChildren) => {
  return <div className="grid grid-cols-2 gap-5 w-full">{children}</div>;
};

const CategoryDetailSummaryCard = ({
  children,
  label,
}: StrictPropsWithChildren & { label: string }) => {
  return (
    <div className="bg-card rounded-medium p-5 border border-white/10 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg">
      <span className="text-secondary typography-body-bold uppercase opacity-60">
        {label}
      </span>
      {children}
    </div>
  );
};

const CategoryDetailSummaryIconCard = ({
  category,
}: {
  category: Category;
}) => {
  const gradient = getGradient(category.categoryColor);
  return (
    <div
      className="w-10 h-10 rounded-small flex items-center justify-center text-white border border-white/5 shadow-sm"
      style={{ background: gradient }}
    >
      <Icon
        icon={category.categoryIconName}
        size="18"
        className="drop-shadow-lg fill-white"
      />
    </div>
  );
};

const CategoryDetailSummaryColorCard = ({
  category,
}: {
  category: Category;
}) => {
  const gradient = getGradient(category.categoryColor);
  return (
    <div
      className="w-10 h-10 rounded-full shadow-md ring-2 ring-offset-2 ring-offset-background ring-[rgba(59,130,246,0.5)] transition-transform"
      style={{ background: gradient, borderColor: gradient }}
    />
  );
};

const CategoryDetailSummarySkeletonCard = ({
  label,
  shape = 'square',
}: {
  label: string;
  shape?: 'square' | 'circle';
}) => (
  <CategoryDetailSummaryCard label={label}>
    <Skeleton
      className={`w-10 h-10 ${shape === 'circle' ? 'rounded-full' : 'rounded-small'}`}
    />
  </CategoryDetailSummaryCard>
);

const CategoryDetailSummarySkeleton = () => (
  <CategoryDetailSummaryRoot>
    <div className="relative mb-8">
      <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-60" />
      <Skeleton className="w-20 h-20 rounded-full shadow-xl z-10 relative ring-4 ring-background" />
    </div>
    <Skeleton className="h-8 w-48 mb-8 rounded-[4px]" />
    <CategoryDetailSummaryGridSection>
      <CategoryDetailSummarySkeletonCard label="아이콘" shape="square" />
      <CategoryDetailSummarySkeletonCard label="테마 색상" shape="circle" />
    </CategoryDetailSummaryGridSection>
  </CategoryDetailSummaryRoot>
);

const CategoryDetailSummaryMain = ({ category }: { category: Category }) => (
  <CategoryDetailSummaryRoot>
    <CategoryDetailSummaryIconSection category={category} />
    <CategoryDetailSummaryTitleSection category={category} />
    <CategoryDetailSummaryGridSection>
      <CategoryDetailSummaryCard label="아이콘">
        <CategoryDetailSummaryIconCard category={category} />
      </CategoryDetailSummaryCard>
      <CategoryDetailSummaryCard label="테마 색상">
        <CategoryDetailSummaryColorCard category={category} />
      </CategoryDetailSummaryCard>
    </CategoryDetailSummaryGridSection>
  </CategoryDetailSummaryRoot>
);

export const CategoryDetailSummary = Object.assign(CategoryDetailSummaryMain, {
  Skeleton: CategoryDetailSummarySkeleton,
});
