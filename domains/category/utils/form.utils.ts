import {
  CATEGORY_FORM_MODE,
  CategoryFormMode,
  DEFAULT_VALUE,
} from '@/domains/category/constants';
import { Category, CategoryFormValues } from '@/domains/category/types';
import { cn } from '@/shared/utils';

export const toCategoryPayload = ({
  categoryName,
  categoryIconName,
  categoryColor,
}: CategoryFormValues) => ({
  categoryName: categoryName.trim(),
  categoryIconName,
  categoryColor,
});

export const getInitialFormValues = (initialData?: CategoryFormValues) => {
  if (!initialData) return DEFAULT_VALUE;

  const { categoryName, categoryIconName, categoryColor } = initialData;

  return {
    categoryName,
    categoryIconName,
    categoryColor,
  };
};

type GetCategoryFormParamsProps = {
  mode: CategoryFormMode;
  category?: Category;
  initialCategoryId?: string;
};

export const getCategoryFormParams = ({
  mode,
  category,
  initialCategoryId,
}: GetCategoryFormParamsProps) => {
  if (mode === CATEGORY_FORM_MODE.EDIT) {
    return {
      mode,
      initCategoryValues: getInitialFormValues(category),
      initialCategoryId: initialCategoryId!,
    };
  }
  return {
    mode,
    initCategoryValues: getInitialFormValues(),
  };
};

export const getIconOptionButtonClassName = (isSelected: boolean) => {
  return cn(
    'size-full aspect-square rounded-full flex items-center justify-center transition-all shadow-lg',
    isSelected
      ? 'bg-primary text-white shadow-lg shadow-primary/30'
      : 'bg-card text-secondary/60 hover:text-white',
  );
};
