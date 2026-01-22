import { useFormContext } from 'react-hook-form';

import { SignupFormValues } from '@/domains/signup/types';
import { FieldError } from '@/shared/ui/field';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

export default function PasswordField() {
  const { control, formState } = useFormContext<SignupFormValues>();
  const error = formState.errors.password;

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormLabel>비밀번호</FormLabel>
          <FormDescription>
            비밀번호는 영어, 숫자, 특수기호를 포함하여 8~20글자로 작성해주세요.
          </FormDescription>
          <FormControl>
            <Input
              {...field}
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}
