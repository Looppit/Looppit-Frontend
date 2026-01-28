import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getUserProfile } from './user.api';
import { UserProfileResponse } from './user.types';

const profileQueryOption = queryOptions<UserProfileResponse>({
  queryKey: ['user-profile'],
  queryFn: getUserProfile,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

export const useUserProfile = () => {
  return useQuery<UserProfileResponse>(profileQueryOption);
};

export const useUserProfileWithSuspense = () => {
  return useSuspenseQuery(profileQueryOption);
};
