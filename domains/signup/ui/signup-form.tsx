import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSignup } from '@/domains/signup/hooks';
import { signupFormSchema, SignupFormValues } from '@/domains/signup/types';
import { isApiError } from '@/shared/guard';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Spacing } from '@/shared/ui/spacing';

import EmailConfirmField from './email-confirm-field';
import EmailField from './email-field';
import PasswordConfirmField from './password-confirm-field';
import PasswordField from './password-field';

export default function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutateAsync: signup, isPending } = useSignup();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await signup(data);
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailField onEmailSent={() => setIsEmailSent(true)} />
        {isEmailSent && <EmailConfirmField timer="5:00" />}
        <PasswordField />
        <PasswordConfirmField />
        <div className="flex flex-col">
          <Spacing size={108} />
          <Button
            className="w-full"
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? '회원가입 중...' : '회원가입'}
          </Button>
          <Toaster position="top-center" />
        </div>
      </form>
    </Form>
  );
}
