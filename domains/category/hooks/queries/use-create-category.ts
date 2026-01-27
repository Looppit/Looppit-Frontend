import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCategory } from '@/domains/category/api';
import { categoryKeys } from '@/domains/category/category.keys';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
        refetchType: 'all',
      });
      toast.success('카테고리가 생성되었어요');
    },
    onError: (error) => {
      toast.error('카테고리 생성에 실패했어요');
      console.error('카테고리 생성 오류:', error);
    },
  });
};
