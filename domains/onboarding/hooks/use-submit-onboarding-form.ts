import { useCallback } from 'react';

import { useUpdateProfile } from '@/domains/user/hooks';
import { UserProfileFormValues } from '@/domains/user/user.types';

type UpdateFormData = Omit<UserProfileFormValues, 'content'>;

export const useSubmitOnboardingForm = () => {
  const { updateProfile, isPending } = useUpdateProfile();

  const submitOnboardingForm = useCallback(
    async (data: UpdateFormData, onSuccess?: () => void) => {
      await updateProfile({
        form: data,
        onSuccess,
      });
    },
    [updateProfile],
  );

  return { submitOnboardingForm, isPending };
};
