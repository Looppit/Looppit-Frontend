import { useFormContext } from 'react-hook-form';

import { FieldError } from '@/shared/ui/field';
import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { OnboardingFormValues } from '../onboarding.types';

function NicknameStep() {
  const { control, formState } = useFormContext<OnboardingFormValues>();
  const error = formState.errors.nickname;

  return (
    <FormField
      control={control}
      name="nickname"
      render={({ field }) => (
        <FormItem className="w-full flex flex-col gap-2">
          <FormControl>
            <Input {...field} placeholder="이메일을 입력해주세요." />
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}

export { NicknameStep };
