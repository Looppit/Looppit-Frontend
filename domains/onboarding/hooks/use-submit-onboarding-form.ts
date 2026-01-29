import { useCallback } from 'react';

import { useUpdateProfile } from '@/domains/user/hooks';
import { UpdateUserRequest } from '@/domains/user/user.types';

type UpdateFormData = Pick<UpdateUserRequest, 'nickname'> & {
  imageFile?: File;
};

export const useSubmitOnboardingForm = () => {
  const { updateProfile } = useUpdateProfile();

  const submitOnboardingForm = useCallback(
    async (data: UpdateFormData, onSuccess?: () => void) => {
      await updateProfile({ form: data, onSuccess });
    },
    [updateProfile],
  );

  return { submitOnboardingForm };
};
