import { useRouter } from 'next/navigation';

import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { isApiError } from '@/shared/guard';

import { deleteUser, getUserProfile, updateUser } from '../user.api';
import { userKeys } from '../user.keys';
import { User, GetUserResponse } from '../user.types';

const profileQueryOption = queryOptions<GetUserResponse>({
  queryKey: ['user-profile'],
  queryFn: getUserProfile,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

export const useUserProfile = () => {
  return useQuery<GetUserResponse>(profileQueryOption);
};

export const useUserProfileWithSuspense = () => {
  return useSuspenseQuery(profileQueryOption);
};

export const useGetUser = () => {
  return useQuery<GetUserResponse, Error, User>({
    queryKey: userKeys.base,
    queryFn: () => getUserProfile(),
    select: (data) => data.result,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.base });
    },
    onError: (error) => {
      console.error(error);
      if (isApiError(error)) {
        toast.error(error.message);
        return;
      }
      toast.error(
        '프로필을 업데이트 하는 도중 오류가 발생했어요. 다시 시도해주세요.',
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.base });

      toast.success('회원탈퇴가 완료되었어요.');
      router.push('/');
    },
  });
};
