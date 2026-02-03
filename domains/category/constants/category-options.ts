import * as categoryIcons from '@/shared/assets/category-icons';
import { CategoryIconName } from '@/shared/ui/icon';

export const CATEGORY_ICONS = Object.keys(categoryIcons) as CategoryIconName[];

export const CATEGORY_ICON_PREVIEW = CATEGORY_ICONS.slice(0, 9);
