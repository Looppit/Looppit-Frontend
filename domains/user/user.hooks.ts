import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from './user.api';
import { UserProfileResponse } from './user.types';

export const useUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(),
  });
};
