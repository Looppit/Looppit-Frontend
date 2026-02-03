'use client';

import { useCallback, useMemo } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { CategoryFormMode } from '@/domains/category/constants';
import { getCategoryFormParams } from '@/domains/category/utils';

import { useCategoriesWithSuspense } from './queries';

export const useCategoryFormParams = (mode: CategoryFormMode) => {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const { data: categories = [] } = useCategoriesWithSuspense();

  const category = useMemo(
    () => categories.find(({ id }) => id === Number(params.id)),
    [categories, params.id],
  );

  const onSuccess = useCallback(() => router.back(), [router]);

  return useMemo(() => {
    return {
      ...getCategoryFormParams({
        mode,
        category,
        initialCategoryId: params.id,
      }),
      onSuccess,
    };
  }, [mode, onSuccess, category, params.id]);
};
