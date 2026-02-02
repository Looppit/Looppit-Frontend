'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useCategoriesWithSuspense } from '@/domains/category/hooks';
import {
  CategoryDetailHeader,
  CategoryDetailLoading,
  CategoryDetailNotFound,
  CategoryDetailSummary,
  CategoryUtilsSheet,
} from '@/domains/category/ui';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { ConditionalRender } from '@/shared/ui/condition-render';

const CategoryDetailContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id: categoryId } = useParams<{ id: string }>();

  const { data: categories = [] } = useCategoriesWithSuspense();
  const category = categories.find(({ id }) => id === Number(categoryId));

  return (
    <ConditionalRender when={!!category} fallback={<CategoryDetailNotFound />}>
      <CategoryDetailHeader onRightClick={() => setIsOpen(true)} />
      <CategoryDetailSummary category={category!} />
      <CategoryUtilsSheet open={isOpen} setOpen={setIsOpen} />
    </ConditionalRender>
  );
};

export const CategoryDetailScreen = () => {
  return (
    <QueryErrorBoundary loadingFallback={<CategoryDetailLoading />}>
      <CategoryDetailContent />
    </QueryErrorBoundary>
  );
};
