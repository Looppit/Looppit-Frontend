import {
  CATEGORY_FORM_MODE,
  CategoryFormMode,
  DEFAULT_VALUE,
} from '@/domains/category/constants';
import {
  Category,
  CategoryFormValues,
  UseCategoryFormProps,
} from '@/domains/category/types';

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

type getCategoryFormParamsProps = Pick<
  UseCategoryFormProps,
  'onSuccess' | 'initialCategoryId'
> & {
  mode: CategoryFormMode;
  category?: Category;
};

export const getCategoryFormParams = ({
  mode,
  onSuccess,
  category,
  initialCategoryId,
}: getCategoryFormParamsProps) => {
  if (mode === CATEGORY_FORM_MODE.EDIT) {
    return {
      mode,
      onSuccess,
      initCategoryValues: getInitialFormValues(category),
      initialCategoryId: initialCategoryId!,
    };
  }
  return {
    mode,
    onSuccess,
  };
};
