import { CategoryColor, CategoryIconName } from '@/domains/category/constants';

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
