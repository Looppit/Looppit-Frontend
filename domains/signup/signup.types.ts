import { z } from 'zod';

export type SignupErrorMessageKeys = 'email' | 'password';

export const signupFormSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
