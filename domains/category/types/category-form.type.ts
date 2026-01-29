import { CATEGORY_FORM_MODE } from '@/domains/category/constants';
import { CategoryFormValues } from '@/domains/category/types/schema';

export type UseCategoryFormProps =
  | {
      mode: typeof CATEGORY_FORM_MODE.CREATE;
      onSuccess?: () => void;
      initCategoryValues?: never;
      initialCategoryId?: never;
    }
  | {
      mode: typeof CATEGORY_FORM_MODE.EDIT;
      onSuccess?: () => void;
      initCategoryValues: CategoryFormValues;
      initialCategoryId: string;
    };
