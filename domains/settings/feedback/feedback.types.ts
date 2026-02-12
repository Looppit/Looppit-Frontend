import { z } from 'zod';

const feedbackFormBaseSchema = z.object({
  reason: z.string().optional(),
  moment: z.string().optional(),
  neededFeature: z.string().optional(),
  message: z.string().optional(),
});

export const feedbackFormSchema = feedbackFormBaseSchema.refine(
  (data) => {
    const values = [
      data.reason,
      data.moment,
      data.neededFeature,
      data.message,
    ].filter((v): v is string => typeof v === 'string');
    return values.some((v) => v.trim() !== '');
  },
  { message: '한 개 이상의 항목을 입력해 주세요.' },
);

export type FeedbackFormValues = z.infer<typeof feedbackFormBaseSchema>;
