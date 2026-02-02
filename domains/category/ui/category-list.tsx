'use client';

import { useCategoriesWithSuspense } from '@/domains/category/hooks';
import {
  CategoryCard,
  CategoryEmpty,
  CategoryLoading,
} from '@/domains/category/ui';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { ConditionalRender } from '@/shared/ui/condition-render';

const CategoryListContent = () => {
  const { data: categories } = useCategoriesWithSuspense();

  return (
    <>
      <ConditionalRender
        when={categories.length > 0}
        fallback={<CategoryEmpty />}
      >
        <CategoryCard.Root>
          {categories.map((category) => (
            <CategoryCard.Item key={category.id} {...category} />
          ))}
        </CategoryCard.Root>
      </ConditionalRender>
    </>
  );
};

export const CategoryList = () => {
  return (
    <QueryErrorBoundary loadingFallback={<CategoryLoading />}>
      <CategoryListContent />
    </QueryErrorBoundary>
  );
};
