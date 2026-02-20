import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { CONTENT_MAX_LENGTH } from '../../user.constants';
import { UserProfileFormValues } from '../../user.types';

export function ContentField() {
  const { control } = useFormContext<UserProfileFormValues>();

  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <FormLabel>한줄 소개</FormLabel>
            <span className="text-secondary opacity-50 typography-body-semibold">
              {field.value?.length ?? 0}/{CONTENT_MAX_LENGTH}
            </span>
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder="한줄 소개를 입력해주세요."
              maxLength={CONTENT_MAX_LENGTH}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
