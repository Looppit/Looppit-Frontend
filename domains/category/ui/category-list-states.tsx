import { CategoryCard } from './category-card';

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

export const CategoryEmpty = () => {
  return (
    <div className="text-secondary text-center typography-body-semibold py-8">
      카테고리가 없어요 🥹
    </div>
  );
};
