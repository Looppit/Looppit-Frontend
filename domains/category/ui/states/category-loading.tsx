import { CategoryCard } from '@/domains/category/ui';

const SKELETON_ITEM_COUNT = 6;

export const CategoryLoading = () => {
  return (
    <CategoryCard.Root>
      {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, index) => (
        <CategoryCard.SkeletonItem key={index} />
      ))}
    </CategoryCard.Root>
  );
};
