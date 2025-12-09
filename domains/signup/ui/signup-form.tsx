import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Spacing } from '@/shared/ui/spacing';

import { signupFormSchema, SignupFormValues } from '../signup.types';
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

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EmailField />
        <EmailConfirmField timer="5:00" />
        <PasswordField />
        <PasswordConfirmField />
        <div className="flex flex-col">
          <Spacing size={108} />
          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
}
