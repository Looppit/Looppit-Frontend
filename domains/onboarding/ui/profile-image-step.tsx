import { useFormContext } from 'react-hook-form';

import { toast } from 'sonner';

import { InputProfileImage } from '@/shared/ui/user';
import { getImageFileValidatorError } from '@/shared/utils';

import { OnboardingFormValues } from '../onboarding.types';

function ProfileImageStep() {
  const { setValue, watch } = useFormContext<OnboardingFormValues>();
  const profileImage = watch('profileImage');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const error = getImageFileValidatorError(file);

    if (!file) return;
    if (error) {
      toast.error(error);
      return;
    }
    setValue('profileImage', file);
  };

  return (
    <InputProfileImage
      imageFile={profileImage}
      handleFileChange={handleFileChange}
    />
  );
}

export { ProfileImageStep };
