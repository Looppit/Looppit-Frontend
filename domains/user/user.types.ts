import { z } from 'zod';

import { USER_PROVIDERS, profileFormFieldSchemas } from './user.constants';

/** User 엔티티 스키마 */
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  content: z.string().nullable(),
  imgPath: z.string().nullable(),
  provider: z.enum(USER_PROVIDERS),
});

export type User = z.infer<typeof userSchema>;

/** GET /user API 응답 스키마 */
export const GetUserResponseSchema = z.object({
  responseCode: z.string(),
  result: userSchema,
});

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

const userProfileFieldsSchema = z.object({
  nickname: profileFormFieldSchemas.nickname.required,
  content: profileFormFieldSchemas.content,
});

/** 프로필 폼 스키마 (imgPath: File | string | null) */
export const userProfileFormSchema = userProfileFieldsSchema.extend({
  imgPath: profileFormFieldSchemas.imgPath.withString,
});

export type UserProfileFormValues = z.infer<typeof userProfileFormSchema>;

/** 프로필 수정 API 요청 스키마 (imgPath: string | null) */
export const updateUserRequestSchema = userProfileFieldsSchema.extend({
  imgPath: z.string().nullable(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

/** 회원 탈퇴 요청 스키마 */
export const DeleteUserRequestSchema = z.object({
  password: z.string(),
});

export type DeleteUserRequest = z.infer<typeof DeleteUserRequestSchema>;
