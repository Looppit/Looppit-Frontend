import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { loginFormSchema, LoginFormValues } from '../login.types';
import EmailField from './email-field';
import PasswordField from './password-field';
import { LOGIN_DEFAULT_VALUES } from '../constants';

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailField />
        <PasswordField />
        <div className="flex flex-col items-center justify-center gap-2">
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <span className="text-sm text-gray-500">비밀번호 찾기</span>
        </div>
      </form>
    </Form>
  );
}
