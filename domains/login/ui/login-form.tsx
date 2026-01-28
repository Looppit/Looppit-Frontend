import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

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

  const handleSubmitForm = async (data: LoginFormValues) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    loginMutation(formData);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <EmailField />
        <PasswordField />
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            onClick={form.handleSubmit(handleSubmitForm)}
            className="w-full"
            disabled={submitDisabled}
          >
            {isLoginPending ? '로그인 중...' : '로그인'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
