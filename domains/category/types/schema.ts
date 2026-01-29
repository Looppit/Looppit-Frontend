import { z } from 'zod';

import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/domains/category/constants';

export const categoryFormSchema = z.object({
  categoryName: z.string().min(1, '카테고리 이름을 입력해주세요'),
  categoryIconName: z.enum(CATEGORY_ICONS, '아이콘을 선택해주세요'),
  categoryColor: z.enum(CATEGORY_COLORS, '색상을 선택해주세요'),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
