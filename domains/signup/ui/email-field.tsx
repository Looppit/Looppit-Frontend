import { useFormContext, useWatch } from 'react-hook-form';

import { toast } from 'sonner';

import { SignupFormValues } from '@/domains/signup/types';
import { useTimer } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';

import { useEmailCertificationMutation, useEmailSendMutation } from '../hooks';

interface EmailFieldProps {
  onEmailSendSuccess: () => void;
}

export default function EmailField({ onEmailSendSuccess }: EmailFieldProps) {
  const { control, formState } = useFormContext<SignupFormValues>();
  const emailValue = useWatch({ control, name: 'email' });

  const {
    mutateAsync: sendEmail,
    isPending,
    isSuccess: isEmailSendSuccess,
  } = useEmailSendMutation();
  const { isSuccess: isEmailCertificationSuccess } =
    useEmailCertificationMutation();
  const { startTimer: startEmailResendTimer, isRunning: isTimerRunning } =
    useTimer(60);

  const error = formState.errors.email;
  const isCertificationDisabled =
    emailValue === '' ||
    isPending ||
    error !== undefined ||
    isEmailCertificationSuccess;

  const handleVerifyEmail = async () => {
    if (isCertificationDisabled) return;
    if (isTimerRunning) {
      toast.error('이메일 재요청은 1분 후에 가능해요.');
      return;
    }

    startEmailResendTimer();
    await sendEmail({ email: emailValue });

    toast.success('이메일 인증 메일이 발송되었어요.');
    onEmailSendSuccess();
  };

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="이메일을 입력해주세요."
              />
              <InputGroupAddon align="inline-end">
                <Button
                  variant="ghost"
                  size="caption"
                  className="w-[84px]"
                  disabled={isCertificationDisabled}
                  onClick={handleVerifyEmail}
                >
                  {isEmailSendSuccess ? '재발송' : '인증하기'}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}
