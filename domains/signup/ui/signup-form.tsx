import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSignup } from '@/domains/signup/hooks';
import { signupFormSchema, SignupFormValues } from '@/domains/signup/types';
import { useTimer } from '@/shared/hooks';
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
  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const {
    startTimer: startEmailCertificationTimer,
    endTimer: endEmailCertificationTimer,
    formattedTime: formattedEmailCertificationTime,
  } = useTimer(300);

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const submitDisabled = isSignupPending || !isPasswordConfirmed;

  const onSubmit = (data: SignupFormValues) => {
    if (submitDisabled) return;
    signup(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailField onEmailSendSuccess={() => startEmailCertificationTimer()} />
        <EmailConfirmField
          time={formattedEmailCertificationTime}
          onEmailCertificationSuccess={() => endEmailCertificationTimer()}
        />
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
            onClick={form.handleSubmit(onSubmit)}
            disabled={submitDisabled}
          >
            {isSignupPending ? '회원가입 중...' : '회원가입'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
