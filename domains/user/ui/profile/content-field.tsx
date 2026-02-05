import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { UserProfileFormValues } from '../../user.types';

export function ContentField() {
  const { control } = useFormContext<UserProfileFormValues>();

  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>한줄 소개</FormLabel>
          <FormControl>
            <Input {...field} placeholder="한줄 소개를 입력해주세요." />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
