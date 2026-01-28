import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { toast } from 'sonner';

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

import { useEmailCertificationMutation } from '../hooks';
import { SignupFormValues } from '../types';

interface EmailConfirmFieldProps {
  time: string;
  onEmailCertificationSuccess: () => void;
}

export default function EmailConfirmField({
  time,
  onEmailCertificationSuccess,
}: EmailConfirmFieldProps) {
  const [code, setCode] = useState('');
  const { getValues } = useFormContext<SignupFormValues>();
  const {
    mutateAsync: certifyEmail,
    isPending: isCertificationPending,
    error: certificationError,
  } = useEmailCertificationMutation();
  const isCertificationDisabled = isCertificationPending || code.length !== 6;

  const handleConfirm = async () => {
    if (isCertificationDisabled) return;

    try {
      const email = getValues('email');
      await certifyEmail({ email, code });

      toast.success('이메일 인증이 완료되었습니다.');
      onEmailCertificationSuccess();
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <FormItem className="flex flex-col gap-3">
      <FormLabel>이메일</FormLabel>
      <FormControl>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput
              value={code}
              maxLength={6}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호 6자리를 입력해주세요."
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText className="text-xs text-gray-500">
                {time}
              </InputGroupText>
              <Button
                size="caption"
                variant="ghost"
                className="w-[84px]"
                disabled={isCertificationDisabled}
                onClick={handleConfirm}
              >
                인증하기
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </FormControl>
      {certificationError && (
        <FieldError
          errors={certificationError ? [certificationError] : undefined}
        />
      )}
    </FormItem>
  );
}
