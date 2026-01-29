import { z } from 'zod';

export const userProfileSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  content: z.string(),
  imgPath: z.string(),
  provider: z.unknown(),
});

export const UserProfileResponseSchema = z.object({
  responseCode: z.string(),
  result: userProfileSchema,
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;

export const userProfileFormSchema = z.object({
  nickname: z.string(),
  content: z.string().optional(),
  imgPath: z.string().nullable(),
});

export type UserProfileFormValues = z.infer<typeof userProfileFormSchema>;
export type UpdateUserProfileRequest = UserProfileFormValues;
