import { Controller, useFormContext } from 'react-hook-form';

import { InputProfileImage } from '@/shared/ui/user';

import { UserProfileFormValues } from '../../user.types';

export function ProfileImageField() {
  const { control } = useFormContext<UserProfileFormValues>();

  return (
    <div className="flex flex-col items-center mb-10">
      <Controller
        control={control}
        name="imgPath"
        render={({ field }) => (
          <InputProfileImage
            imageFile={field.value ?? null}
            onFileChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
