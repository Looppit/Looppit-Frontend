import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { categoryKeys } from '@/domains/category/category.keys';
import { deleteCategory } from '@/domains/category-detail/api/category-detail.api';

export const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: async () => {
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
