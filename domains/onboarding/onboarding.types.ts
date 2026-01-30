import { z } from 'zod';

export const onboardingFormSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  profileImage: z.instanceof(File).nullable(),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const nicknameStepSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
});

export const profileImageStepSchema = z.object({
  profileImage: z.instanceof(File).nullable(),
});

export const OnboardingStepSchema: Record<
  OnboardingStep,
  z.ZodSchema<Partial<OnboardingFormValues>>
> = {
  nicknameStep: nicknameStepSchema,
  profileImageStep: profileImageStepSchema,
  completedStep: z.object({}),
};

export type OnboardingStep =
  | 'nicknameStep'
  | 'profileImageStep'
  | 'completedStep';
