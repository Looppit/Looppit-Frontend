import { SignupErrorMessageKeys } from '@/domains/signup/types';
import { ExtendedZodErrorMessageMap } from '@/shared/types';

type SignupErrorMessageValues = Record<
  SignupErrorMessageKeys,
  Partial<ExtendedZodErrorMessageMap>
>;

export const SIGNUP_ERROR_MESSAGES: SignupErrorMessageValues = {
  email: {
    invalid_type: '이메일 형식이 올바르지 않아요.',
    too_small: '이메일을 입력해주세요.',
  },
  password: {
    invalid_type: '비밀번호가 안전하지 않아요.',
    too_small: '비밀번호는 최소 8자 이상 입력해주세요.',
    too_big: '비밀번호는 최대 20자 이하로 입력해주세요.',
  },
} as const;
