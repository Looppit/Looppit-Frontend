import { z } from 'zod';

export const USER_PROVIDERS = ['GOOGLE', 'KAKAO', 'NAVER', 'DEFAULT'];

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  content: z.string().nullable(),
  imgPath: z.string().nullable(),
  provider: z.enum(USER_PROVIDERS),
});

export const GetUserResponseSchema = z.object({
  responseCode: z.string(),
  result: userSchema,
});

export type User = z.infer<typeof userSchema>;
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

export const userProfileFormSchema = z.object({
  nickname: z.string(),
  content: z.string().optional(),
  imgPath: z.instanceof(File).nullable().or(z.string().nullable()),
});

export type UserProfileFormValues = z.infer<typeof userProfileFormSchema>;

export const updateUserRequestSchema = z.object({
  nickname: z.string(),
  content: z.string().optional(),
  imgPath: z.string().nullable(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

export const DeleteUserRequestSchema = z.object({
  password: z.string(),
});

export type DeleteUserRequest = z.infer<typeof DeleteUserRequestSchema>;
