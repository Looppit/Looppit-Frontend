import { z } from 'zod';

import { profileFormFieldSchemas } from '@/domains/user/user.constants';

const { nickname, imgPath } = profileFormFieldSchemas;

/** 온보딩 폼: 닉네임 선택(비필수) */
export const onboardingFormSchema = z.object({
  nickname: nickname.optional,
  imgPath: imgPath.fileOnly,
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const nicknameStepSchema = z.object({
  nickname: nickname.optional,
});

export const profileImageStepSchema = z.object({
  imgPath: imgPath.fileOnly,
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
