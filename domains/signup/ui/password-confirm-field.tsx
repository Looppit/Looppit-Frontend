import { useFormContext } from 'react-hook-form';

import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { SignupFormValues } from '../signup.types';

export default function PasswordConfirmField() {
  const { watch } = useFormContext<SignupFormValues>();

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>비밀번호 확인</FormLabel>
      <FormControl>
        <Input
          value={watch('password')}
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
      </FormControl>
    </FormItem>
  );
}
