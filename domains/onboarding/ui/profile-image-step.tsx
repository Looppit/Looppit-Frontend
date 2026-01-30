import { useFormContext } from 'react-hook-form';

import { InputProfileImage } from '@/shared/ui/user';

import { OnboardingFormValues } from '../onboarding.types';

function ProfileImageStep() {
  const { setValue, watch } = useFormContext<OnboardingFormValues>();
  const profileImage = watch('profileImage');

  const handleFileChange = (file?: File) => {
    setValue('profileImage', file ?? null);
  };

  return (
    <InputProfileImage
      imageFile={profileImage}
      onFileChange={handleFileChange}
    />
  );
}

export { ProfileImageStep };
