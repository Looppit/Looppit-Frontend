import { useFormContext } from 'react-hook-form';

import { NICKNAME_MAX_LENGTH } from '@/domains/user/user.constants';
import { FieldError, FieldLabel } from '@/shared/ui/field';
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
          <div className="flex items-center justify-between">
            <FieldLabel>닉네임</FieldLabel>
            <span className="text-secondary opacity-50 typography-body-semibold">
              {field.value?.length ?? 0}/{NICKNAME_MAX_LENGTH}
            </span>
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder="닉네임을 입력해주세요."
              maxLength={NICKNAME_MAX_LENGTH}
            />
          </FormControl>
          <FieldError errors={error ? [error] : undefined} />
        </FormItem>
      )}
    />
  );
}

export { NicknameStep };
