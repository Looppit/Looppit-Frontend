import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/domains/category/constants';
import { CategoryIconName } from '@/shared/ui/icon';

export const CATEGORY_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export type CategoryFormMode =
  (typeof CATEGORY_FORM_MODE)[keyof typeof CATEGORY_FORM_MODE];

export const DEFAULT_VALUE = {
  categoryName: '',
  categoryIconName: CATEGORY_ICONS[0],
  categoryColor: CATEGORY_COLORS[0],
};

export const DEFAULT_CATEGORY = {
  categoryName: '개인',
  categoryIconName: 'ic_favorite' as CategoryIconName,
  categoryColor: CATEGORY_COLORS[0],
};

export const CATEGORY_NAME_MAX_LENGTH = 15;
