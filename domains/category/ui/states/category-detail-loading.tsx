import {
  CategoryDetailHeaderFallback,
  CategoryDetailInfo,
} from '@/domains/category/ui';
import { Skeleton } from '@/shared/ui/skeleton';

const CategoryDetailLoadingIconSection = () => {
  return (
    <div className="relative mb-8">
      <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-60"></div>
      <Skeleton className="w-20 h-20 rounded-full shadow-xl z-10 relative ring-4 ring-background" />
    </div>
  );
};

const CategoryDetailLoadingTitleSection = () => {
  return <Skeleton className="h-8 w-48 mb-8 rounded-[4px]" />;
};

interface CategoryDetailLoadingCardProps {
  label: string;
  shape?: 'square' | 'circle';
}

const CategoryDetailLoadingCard = ({
  label,
  shape = 'square',
}: CategoryDetailLoadingCardProps) => {
  return (
    <CategoryDetailInfo.Card label={label}>
      <Skeleton
        className={`w-10 h-10 ${shape === 'circle' ? 'rounded-full' : 'rounded-small'}`}
      />
    </CategoryDetailInfo.Card>
  );
};

export const CategoryDetailLoading = () => {
  return (
    <>
      <CategoryDetailHeaderFallback />
      <CategoryDetailInfo.Root>
        <CategoryDetailLoadingIconSection />
        <CategoryDetailLoadingTitleSection />
        <CategoryDetailInfo.GridSection>
          <CategoryDetailLoadingCard label="아이콘" shape="square" />
          <CategoryDetailLoadingCard label="테마 색상" shape="circle" />
        </CategoryDetailInfo.GridSection>
      </CategoryDetailInfo.Root>
    </>
  );
};
