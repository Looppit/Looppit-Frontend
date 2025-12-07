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
import { useEmailSendMutation } from '../hooks/use-email-verification';

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
  const { isSuccess: isEmailSendSuccess } = useEmailSendMutation();

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const submitDisabled =
    isPending || !isEmailSendSuccess || !isPasswordConfirmed;

  const onSubmit = async (data: SignupFormValues) => {
    if (submitDisabled) return;

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
        <EmailField />
        {isEmailSendSuccess && <EmailConfirmField timer="5:00" />}
        <PasswordField />
        <PasswordConfirmField
          isPasswordConfirmed={isPasswordConfirmed}
          onChangeConfirmStatus={(isConfirmed) =>
            setIsPasswordConfirmed(isConfirmed)
          }
        />
        <div className="flex flex-col">
          <Spacing size={108} />
          <Button
            className="w-full"
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={submitDisabled}
          >
            {isPending ? '회원가입 중...' : '회원가입'}
          </Button>
          <Toaster position="top-center" />
        </div>
      </form>
    </Form>
  );
}
