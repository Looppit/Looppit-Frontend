import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { UserProfileFormValues } from '../../user.types';

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
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
