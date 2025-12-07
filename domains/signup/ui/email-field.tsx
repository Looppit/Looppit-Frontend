import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SignupFormValues } from '@/domains/signup/types';
import { isApiError } from '@/shared/guard';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { useEmailSendMutation } from '../hooks/use-email-verification';

interface EmailFieldProps {
  onEmailSent: () => void;
}

export default function EmailField({ onEmailSent }: EmailFieldProps) {
  const { control, formState, getValues } = useFormContext<SignupFormValues>();
  const {
    mutateAsync: sendEmail,
    isPending,
    isSuccess,
  } = useEmailSendMutation();
  const emailValue = getValues('email');
  const error = formState.errors.email;
  const isCertificationDisabled =
    emailValue === '' || isPending || error !== undefined;

  const handleVerifyEmail = async () => {
    if (isCertificationDisabled) return;

    try {
      await sendEmail({ email: emailValue });

      toast.success('이메일 인증 메일이 발송되었습니다.');
      onEmailSent();
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    }
  };

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
              <Button
                className="w-[84px]"
                disabled={isCertificationDisabled}
                variant="outline"
                onClick={handleVerifyEmail}
              >
                {isSuccess ? '재발송' : '인증하기'}
              </Button>
            </div>
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}
