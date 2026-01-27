import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useCreatePresignedUrl } from '@/domains/s3/s3.hooks';

import { useUpdateUser } from './use-user-query';
import { userKeys } from '../user.keys';
import { UpdateUserRequest } from '../user.types';

type UpdateFormData = Omit<UpdateUserRequest, 'imgPath'> & {
  imageFile?: File;
};

/**
 * 유저 프로필 업데이트 훅
 * 발급받은 presigned url을 사용하여 이미지를 업로드 하고, 유저 프로필을 업데이트 과정을 동기적으로 진행하는 훅
 */
export const useUpdateProfile = () => {
  const { mutateAsync: createPresignedUrlMutation } = useCreatePresignedUrl();
  const { mutate: updateUserMutation } = useUpdateUser();
  const queryClient = useQueryClient();

  const updateProfile = useCallback(
    async (data: UpdateFormData) => {
      const { imageFile, ...rest } = data;
      const requestData: UpdateUserRequest = {
        ...rest,
      };

      if (imageFile) {
        const { url } = await createPresignedUrlMutation({
          fileName: imageFile.name,
        });
        requestData.imgPath = url;
      }

      updateUserMutation(requestData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: userKeys.base });
        },
      });
    },
    [createPresignedUrlMutation, updateUserMutation, queryClient],
  );

  return { updateProfile };
};
