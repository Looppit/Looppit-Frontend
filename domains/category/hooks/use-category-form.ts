import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  CATEGORY_FORM_MODE,
  DEFAULT_VALUE,
} from '@/domains/category/constants';
import { useCreateCategory, useUpdateCategory } from '@/domains/category/hooks';
import {
  categoryFormSchema,
  type CategoryFormValues,
  type UseCategoryFormProps,
} from '@/domains/category/types';
import { toCategoryPayload } from '@/domains/category/utils';
import { getFormValidationMessage } from '@/shared/lib';

export const useCategoryForm = ({
  mode,
  onSuccess,
  initialCategoryId,
  initCategoryValues,
}: UseCategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    values: initCategoryValues,
    mode: 'onChange',
  });

  const resetForm = useCallback(() => {
    form.reset(DEFAULT_VALUE);
  }, [form]);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const watchedValues = useWatch({
    control: form.control,
    name: ['categoryName', 'categoryIconName', 'categoryColor'],
  });

  const [categoryName, selectedIcon, selectedColor] = watchedValues;

  const handleMutationSuccess = useCallback(() => {
    resetForm();
    onSuccess?.();
  }, [resetForm, onSuccess]);

  const handleCreate = useCallback(
    (data: CategoryFormValues) => {
      createCategoryMutation.mutate(toCategoryPayload(data), {
        onSuccess: handleMutationSuccess,
      });
    },
    [createCategoryMutation, handleMutationSuccess],
  );

  const handleUpdate = useCallback(
    (data: CategoryFormValues) => {
      if (!initCategoryValues || !initialCategoryId) {
        toast.error('카테고리 정보를 불러올 수 없어요.');
        return;
      }

      updateCategoryMutation.mutate(
        {
          categoryId: initialCategoryId,
          data: toCategoryPayload(data),
        },
        {
          onSuccess: handleMutationSuccess,
        },
      );
    },

    [
      handleMutationSuccess,
      initCategoryValues,
      initialCategoryId,
      updateCategoryMutation,
    ],
  );

  const handleSubmit = useCallback(
    (e?: React.BaseSyntheticEvent) => {
      return form.handleSubmit(
        (data) => {
          if (mode === CATEGORY_FORM_MODE.CREATE) {
            handleCreate(data);
            return;
          }
          handleUpdate(data);
        },
        (error) => {
          toast.error(getFormValidationMessage(error));
        },
      )(e);
    },
    [form, mode, handleCreate, handleUpdate],
  );

  return {
    form,
    categoryName,
    selectedIcon,
    selectedColor,
    handleSubmit,
    isSubmitting:
      mode === CATEGORY_FORM_MODE.CREATE
        ? createCategoryMutation.isPending
        : updateCategoryMutation.isPending,
  };
};
