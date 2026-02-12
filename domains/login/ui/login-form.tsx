import { useCallback } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { getFormValidationMessage } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/posthog';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { loginFormSchema, LoginFormValues } from '../login.types';
import EmailField from './email-field';
import PasswordField from './password-field';
import { LOGIN_DEFAULT_VALUES } from '../constants';
import { useLogin } from '../hooks';

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });
  const { mutate: loginMutation, isPending: isLoginPending } = useLogin();
  const submitDisabled = isLoginPending;

  const handleSubmit = useCallback(
    async (data: LoginFormValues) => {
      trackEvent('login_started', { method: 'email' });

      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      loginMutation(formData);
    },
    [loginMutation],
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
        <EmailField />
        <PasswordField />
        <div className="flex flex-col items-center justify-center gap-2">
          <Button type="submit" className="w-full" disabled={submitDisabled}>
            {isLoginPending ? '로그인 중...' : '로그인'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
