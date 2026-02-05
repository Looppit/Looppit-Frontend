import { useCallback } from 'react';

import { useUpdateProfile } from '@/domains/user/hooks';
import { UserProfileFormValues } from '@/domains/user/user.types';

type UpdateFormData = Omit<UserProfileFormValues, 'content'>;

export const useSubmitOnboardingForm = () => {
  const { updateProfileMutations, isPending } = useUpdateProfile();

  const submitOnboardingForm = useCallback(
    async (data: UpdateFormData, onSuccess?: () => void) => {
      await updateProfileMutations({
        form: data,
        onSuccess,
      });
    },
    [updateProfileMutations],
  );

  return { submitOnboardingForm, isPending };
};
