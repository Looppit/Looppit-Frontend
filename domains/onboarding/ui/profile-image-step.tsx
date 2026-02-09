import { useFormContext } from 'react-hook-form';

import { InputProfileImage } from '@/shared/ui/user';

import { OnboardingFormValues } from '../onboarding.types';

function ProfileImageStep() {
  const { setValue, watch } = useFormContext<OnboardingFormValues>();
  const profileImage = watch('imgPath');

  const handleFileChange = (file?: File) => {
    setValue('imgPath', file ?? null);
  };

  return (
    <InputProfileImage
      imageFile={profileImage}
      onFileChange={handleFileChange}
      className="py-6"
    />
  );
}

export { ProfileImageStep };
