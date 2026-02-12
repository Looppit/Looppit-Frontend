import { useCallback, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useSignup } from '@/domains/signup/hooks';
import { signupFormSchema, SignupFormValues } from '@/domains/signup/types';
import { useTimer } from '@/shared/hooks';
import { getFormValidationMessage } from '@/shared/lib';
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
    startTimer: handleStartEmailCertificationTimer,
    endTimer: handleEndEmailCertificationTimer,
    formattedTime: formattedEmailCertificationTime,
  } = useTimer(180);

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const submitDisabled = isSignupPending || !isPasswordConfirmed;

  const handleSubmit = useCallback(
    (data: SignupFormValues) => {
      if (submitDisabled) return;
      signup(data);
    },
    [submitDisabled, signup],
  );

  const handleError = useCallback((errors: FieldErrors) => {
    toast.error(getFormValidationMessage(errors));
  }, []);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit, handleError)}
      >
        <EmailField onEmailSendSuccess={handleStartEmailCertificationTimer} />
        <EmailConfirmField
          time={formattedEmailCertificationTime}
          onEmailCertificationSuccess={handleEndEmailCertificationTimer}
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
          <Button type="submit" disabled={submitDisabled}>
            {isSignupPending ? '회원가입 중...' : '회원가입'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
