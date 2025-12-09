import { z } from 'zod';

import { SIGNUP_ERROR_MESSAGES } from '@/domains/signup/constants';

export type SignupErrorMessageKeys = 'email' | 'password';

export const signupFormSchema = z.object({
  email: z
    .string(SIGNUP_ERROR_MESSAGES.email.invalid_type)
    .min(1, SIGNUP_ERROR_MESSAGES.email.too_small)
    .email(SIGNUP_ERROR_MESSAGES.email.invalid_type),
  password: z
    .string(SIGNUP_ERROR_MESSAGES.password.invalid_type)
    .min(8, SIGNUP_ERROR_MESSAGES.password.too_small)
    .max(20, SIGNUP_ERROR_MESSAGES.password.too_big)
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      SIGNUP_ERROR_MESSAGES.password.invalid_type,
    ),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
