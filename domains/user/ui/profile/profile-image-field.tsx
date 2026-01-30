import { Controller, useFormContext } from 'react-hook-form';

import { InputProfileImage } from '@/shared/ui/user';

import { UserProfileFormValues } from '../../user.types';

export function ProfileImageField() {
  const { control } = useFormContext<UserProfileFormValues>();

  return (
    <div className="flex flex-col items-center">
      <Controller
        control={control}
        name="imgPath"
        render={({ field }) => (
          <InputProfileImage
            imageUrl={field.value ?? null}
            handleFileChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
