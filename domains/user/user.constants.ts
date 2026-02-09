import { z } from 'zod';

export const USER_PROVIDERS = ['GOOGLE', 'KAKAO', 'NAVER', 'DEFAULT'];

export const NICKNAME_MAX_LENGTH = 15;
export const CONTENT_MAX_LENGTH = 30;

export const USER_PROFILE_FORM_ERROR_MESSAGES = {
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_MAX: '닉네임은 15자 이하로 입력해주세요.',
  CONTENT_MAX: '한줄 소개는 30자 이하로 입력해주세요.',
} as const;

/**
 * 프로필/온보딩 폼 공통 필드 스키마.
 * 닉네임·한줄소개·이미지 검증을 한 곳에서 관리하고 가져다 쓸 때 사용.
 */
export const profileFormFieldSchemas = {
  nickname: {
    required: z
      .string()
      .min(1, { message: USER_PROFILE_FORM_ERROR_MESSAGES.NICKNAME_REQUIRED })
      .max(NICKNAME_MAX_LENGTH, {
        message: USER_PROFILE_FORM_ERROR_MESSAGES.NICKNAME_MAX,
      }),
    optional: z.string().max(NICKNAME_MAX_LENGTH, {
      message: USER_PROFILE_FORM_ERROR_MESSAGES.NICKNAME_MAX,
    }),
  },
  content: z
    .string()
    .max(CONTENT_MAX_LENGTH, {
      message: USER_PROFILE_FORM_ERROR_MESSAGES.CONTENT_MAX,
    })
    .optional(),
  imgPath: {
    /** File만 (온보딩/스텝 검증용) */
    fileOnly: z.instanceof(File).nullable(),
    /** File | string | null (프로필 수정 폼, 기존 URL 포함) */
    withString: z.instanceof(File).nullable().or(z.string().nullable()),
  },
};
