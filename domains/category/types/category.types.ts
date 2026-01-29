import { CategoryColor, CategoryIconName } from '@/domains/category/constants';
import { CategoryFormValues } from '@/domains/category/types/schema';

export interface Category {
  id: number;
  categoryName: string;
  categoryIconName: CategoryIconName;
  categoryColor: CategoryColor;
}

/** API Response Types */
export type CategoryResponse = Category[];

/** API Request Types */
export type CreateCategoryParams = Omit<Category, 'id'>;

export type UpdateCategoryParams = {
  categoryId: string;
  data: CategoryFormValues;
};
