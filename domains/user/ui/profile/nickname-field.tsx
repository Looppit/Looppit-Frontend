import { useFormContext } from 'react-hook-form';

import { NICKNAME_MAX_LENGTH } from '@/domains/user/user.constants';
import { UserProfileFormValues } from '@/domains/user/user.types';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

export function NicknameField() {
  const { control } = useFormContext<UserProfileFormValues>();
  return (
    <FormField
      control={control}
      name="nickname"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>닉네임</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="닉네임을 입력해주세요."
              maxLength={NICKNAME_MAX_LENGTH}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
