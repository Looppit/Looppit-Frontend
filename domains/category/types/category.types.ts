import { CategoryColor } from '@/domains/category/constants';
import { IconName } from '@/shared/ui/icon';

export interface Category {
  id: number;
  categoryName: string;
  categoryIconName: IconName;
  categoryColor: CategoryColor;
}

/** API Response Types */
export type CategoryResponse = Category[];

/** API Request Types */
export interface CreateCategoryRequest {
  categoryName: string;
}
