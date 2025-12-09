import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { SignupFormValues } from '../signup.types';

export default function EmailField() {
  const { control, formState } = useFormContext<SignupFormValues>();
  const error = formState.errors.email;

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input {...field} placeholder="이메일을 입력해주세요." />
              <Button variant="outline">인증하기</Button>
            </div>
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}
