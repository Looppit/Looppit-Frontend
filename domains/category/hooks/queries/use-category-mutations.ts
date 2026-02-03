import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '@/domains/category/api/category.api';
import { categoryKeys } from '@/domains/category/category.keys';
import { UpdateCategoryParams } from '@/domains/category/types';
import type { ApiError } from '@/shared/api/api.types';
import { trackEvent } from '@/shared/lib/posthog';

type UseCreateCategory = {
  showSuccessToast?: boolean;
};

export const useCreateCategory = (options: UseCreateCategory = {}) => {
  const { showSuccessToast = true } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      trackEvent('category_created');
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
        refetchType: 'all',
      });

      if (showSuccessToast) {
        toast.success('카테고리가 생성되었어요');
      }
    },
    onError: (error) => {
      if (showSuccessToast) {
        toast.error('카테고리 생성에 실패했어요');
      }
      console.error('카테고리 생성 오류:', error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, UpdateCategoryParams>({
    mutationFn: updateCategory,
    onSuccess: async () => {
      trackEvent('category_updated');
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
        refetchType: 'all',
      });
      toast.success('카테고리가 수정되었어요');
    },
    onError: (error) => {
      if (error.code === 409) {
        toast.error('카테고리 이름이 이미 존재해요.');
        return;
      }
      toast.error('카테고리 수정에 실패했어요');
      console.error('카테고리 수정 오류:', error);
    },
  });
};

export const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: async () => {
      trackEvent('category_deleted');
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
        refetchType: 'all',
      });
      toast.success('카테고리가 삭제되었어요');
    },
    onError: (error) => {
      toast.error('카테고리 삭제에 실패했어요');
      console.error('카테고리 삭제 오류:', error);
    },
  });
};
