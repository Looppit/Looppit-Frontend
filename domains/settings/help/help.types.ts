import { z } from 'zod';

export const helpFormSchema = z.object({
  inquiry: z
    .string()
    .min(1, '문의 내용을 입력해 주세요.')
    .min(10, '문의 내용은 최소 10자 이상 입력해 주세요.'),
});

export type HelpFormValues = z.infer<typeof helpFormSchema>;
