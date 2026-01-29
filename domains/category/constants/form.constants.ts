import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/domains/category/constants';

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
