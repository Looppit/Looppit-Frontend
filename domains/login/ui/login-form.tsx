import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { isApiError } from '@/shared/guard';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { loginFormSchema, LoginFormValues } from '../login.types';
import EmailField from './email-field';
import PasswordField from './password-field';
import { LOGIN_DEFAULT_VALUES } from '../constants';
import { useLogin } from '../hooks';

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });
  const { mutateAsync: loginMutation, isPending: isLoginPending } = useLogin();
  const submitDisabled = isLoginPending;

  const handleSubmitForm = async (data: LoginFormValues) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response = await loginMutation(formData);

      if (response) {
        router.push('/');
      }
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    }
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
          <span className="text-sm text-gray-500">비밀번호 찾기</span>
        </div>
      </form>
    </Form>
  );
}
