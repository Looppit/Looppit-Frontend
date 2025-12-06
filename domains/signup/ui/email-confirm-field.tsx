import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { isApiError } from '@/shared/guard';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/shared/ui/input-group';

import { useEmailCertificationMutation } from '../hooks/use-email-certification';
import { SignupFormValues } from '../types';

interface EmailConfirmFieldProps {
  timer: string;
}

export default function EmailConfirmField({
  timer = '5:00',
}: EmailConfirmFieldProps) {
  const [code, setCode] = useState('');
  const { getValues } = useFormContext<SignupFormValues>();
  const {
    mutateAsync: certifyEmail,
    isPending,
    error,
  } = useEmailCertificationMutation();

  const isDisabled = isPending || code.length !== 6;

  const handleConfirm = async () => {
    if (isDisabled) return;

    try {
      const email = getValues('email');
      await certifyEmail({ email, code });

      toast.success('이메일 인증이 완료되었습니다.');
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>이메일</FormLabel>
      <FormControl>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호 6자리를 입력해주세요."
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText className="text-xs text-gray-500">
                {timer}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Button
            disabled={isDisabled}
            variant="outline"
            onClick={handleConfirm}
          >
            인증하기
          </Button>
        </div>
      </FormControl>
      {error && <FieldError errors={error ? [error] : undefined} />}
    </FormItem>
  );
}
