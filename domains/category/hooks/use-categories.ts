import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCategory, getCategories } from '../api/category.api';
import { categoryKeys } from '../category.keys';
import { Category, CreateCategoryRequest } from '../types/category.types';
import { mapCategoryApiToCategory } from '../utils/category.mapper';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: categoryKeys.list(),
    queryFn: async () => {
      const result = await getCategories();
      return result.map(mapCategoryApiToCategory);
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
      toast.success('카테고리가 생성되었어요');
    },
    onError: (error) => {
      toast.error('카테고리 생성에 실패했어요');
      console.error('카테고리 생성 오류:', error);
    },
  });
};
