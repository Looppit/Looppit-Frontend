import { z } from 'zod';

import { SocialProvider } from '@/domains/auth';
import { ExtendedZodErrorMessageMap } from '@/shared/types';

import { LOGIN_ERROR_MESSAGES } from './login.constants';

export type LoginErrorMessageKeys = 'email' | 'password';

export const loginFormSchema = z.object({
  email: z
    .string(LOGIN_ERROR_MESSAGES.email.invalid_type)
    .min(1, LOGIN_ERROR_MESSAGES.email.too_small)
    .email(LOGIN_ERROR_MESSAGES.email.invalid_type),
  password: z
    .string(LOGIN_ERROR_MESSAGES.password.invalid_type)
    .min(1, LOGIN_ERROR_MESSAGES.password.too_small),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type LoginErrorMessageValues = Record<
  LoginErrorMessageKeys,
  Partial<ExtendedZodErrorMessageMap>
>;

export type { SocialProvider };
