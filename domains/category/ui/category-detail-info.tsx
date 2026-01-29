'use client';

import type { Category } from '@/domains/category/types';
import type { StrictPropsWithChildren } from '@/shared/types/components';
import { Icon } from '@/shared/ui/icon';
import { getGradient } from '@/shared/utils';

const CategoryDetailInfoRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="mt-8 flex flex-col items-center px-6 w-full">
      {children}
    </div>
  );
};

interface CategoryDetailInfoIconSectionProps {
  category: Category;
}

const CategoryDetailInfoIconSection = ({
  category,
}: CategoryDetailInfoIconSectionProps) => {
  const categoryGradientColor = getGradient(category.categoryColor);

  return (
    <div className="relative mb-8">
      <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-60"></div>
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10 relative overflow-hidden ring-4 ring-background"
        style={{ background: categoryGradientColor }}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50"></div>
        <Icon
          icon={category.categoryIconName}
          size="30"
          className="drop-shadow-lg fill-white"
        />
      </div>
    </div>
  );
};

interface CategoryDetailInfoTitleSectionProps {
  category: Category;
}

const CategoryDetailInfoTitleSection = ({
  category,
}: CategoryDetailInfoTitleSectionProps) => {
  return (
    <h2 className="typography-title-lg mb-8 tracking-tight text-white/90">
      {category.categoryName}
    </h2>
  );
};

const CategoryDetailInfoGridSection = ({
  children,
}: StrictPropsWithChildren) => {
  return <div className="grid grid-cols-2 gap-5 w-full">{children}</div>;
};

interface CategoryDetailInfoCardProps extends StrictPropsWithChildren {
  label: string;
}

const CategoryDetailInfoCard = ({
  children,
  label,
}: CategoryDetailInfoCardProps) => {
  return (
    <div className="bg-card rounded-medium p-5 border border-white/10 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg">
      <span className="text-secondary typography-body-bold uppercase opacity-60">
        {label}
      </span>
      {children}
    </div>
  );
};

interface CategoryDetailInfoIconCardProps {
  category: Category;
}

const CategoryDetailInfoIconCard = ({
  category,
}: CategoryDetailInfoIconCardProps) => {
  const categoryGradientColor = getGradient(category.categoryColor);

  return (
    <div
      className="w-10 h-10 rounded-small flex items-center justify-center text-white border border-white/5 shadow-sm"
      style={{ background: categoryGradientColor }}
    >
      <Icon
        icon={category.categoryIconName}
        size="18"
        className="drop-shadow-lg fill-white"
      />
    </div>
  );
};

interface CategoryDetailInfoColorCardProps {
  category: Category;
}

const CategoryDetailInfoColorCard = ({
  category,
}: CategoryDetailInfoColorCardProps) => {
  const categoryGradientColor = getGradient(category.categoryColor);

  return (
    <div
      className="w-10 h-10 rounded-full shadow-md ring-2 ring-offset-2 ring-offset-background ring-[rgba(59,130,246,0.5)] transition-transform"
      style={{
        background: categoryGradientColor,
        borderColor: categoryGradientColor,
      }}
    ></div>
  );
};

interface CategoryDetailInfoProps {
  category: Category;
}

export const CategoryDetailInfo = ({ category }: CategoryDetailInfoProps) => {
  return (
    <CategoryDetailInfo.Root>
      <CategoryDetailInfo.IconSection category={category} />
      <CategoryDetailInfo.TitleSection category={category} />
      <CategoryDetailInfo.GridSection>
        <CategoryDetailInfo.Card label="아이콘">
          <CategoryDetailInfo.IconCard category={category} />
        </CategoryDetailInfo.Card>
        <CategoryDetailInfo.Card label="테마 색상">
          <CategoryDetailInfo.ColorCard category={category} />
        </CategoryDetailInfo.Card>
      </CategoryDetailInfo.GridSection>
    </CategoryDetailInfo.Root>
  );
};

CategoryDetailInfo.Root = CategoryDetailInfoRoot;
CategoryDetailInfo.IconSection = CategoryDetailInfoIconSection;
CategoryDetailInfo.TitleSection = CategoryDetailInfoTitleSection;
CategoryDetailInfo.GridSection = CategoryDetailInfoGridSection;
CategoryDetailInfo.Card = CategoryDetailInfoCard;
CategoryDetailInfo.IconCard = CategoryDetailInfoIconCard;
CategoryDetailInfo.ColorCard = CategoryDetailInfoColorCard;
