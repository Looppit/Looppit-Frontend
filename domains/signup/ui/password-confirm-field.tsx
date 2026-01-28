import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FieldError } from '@/shared/ui/field';
import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { SignupFormValues } from '../types';

interface PasswordConfirmFieldProps {
  isPasswordConfirmed: boolean;
  onChangeConfirmStatus: (isConfirmed: boolean) => void;
}

export default function PasswordConfirmField({
  isPasswordConfirmed,
  onChangeConfirmStatus,
}: PasswordConfirmFieldProps) {
  const [isDirty, setIsDirty] = useState(false);
  const { getValues } = useFormContext<SignupFormValues>();
  const password = getValues('password');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsDirty(true);
    onChangeConfirmStatus(value === password && isDirty);
  };

  return (
    <FormItem className="flex flex-col gap-3">
      <FormLabel>비밀번호 확인</FormLabel>
      <FormControl>
        <Input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          onChange={handleChange}
        />
      </FormControl>
      {!isPasswordConfirmed && isDirty && (
        <FieldError>비밀번호가 일치하지 않아요.</FieldError>
      )}
    </FormItem>
  );
}
