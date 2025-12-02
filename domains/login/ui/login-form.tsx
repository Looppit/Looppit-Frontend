import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { loginFormSchema, LoginFormValues } from '../login.types';

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} placeholder="이메일을 입력해주세요." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
