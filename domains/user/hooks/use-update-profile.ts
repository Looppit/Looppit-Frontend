import { useCallback } from 'react';

import { useCreatePresignedUrl } from '@/domains/s3/s3.hooks';
import { getImageContentType } from '@/domains/s3/s3.utils';

import { useUpdateUser } from './use-user-query';
import { UpdateUserRequest } from '../user.types';

type UpdateProfileOptions = {
  form: UpdateUserRequest;
  onSuccess?: () => void;
};

/**
 * 유저 프로필 업데이트 훅
 * 발급받은 presigned url을 사용하여 이미지를 업로드 하고, 유저 프로필을 업데이트 과정을 동기적으로 진행하는 훅
 */
export const useUpdateProfile = () => {
  const { mutateAsync: createPresignedUrlMutation } = useCreatePresignedUrl();
  const { mutate: updateUserMutation } = useUpdateUser();

  const updateProfile = useCallback(
    async ({ form, onSuccess }: UpdateProfileOptions) => {
      try {
        const { imgPath } = form;
        const requestData: UpdateUserRequest = {
          ...form,
          imgPath: null,
        };
        if (imgPath instanceof File) {
          const contentType = getImageContentType(imgPath);
          const { url } = await createPresignedUrlMutation({
            fileName: imgPath.name,
            contentType,
          });
          requestData.imgPath = url;
        }

        updateUserMutation(requestData, { onSuccess });
      } catch (error) {
        console.error(error);
      }
    },
    [createPresignedUrlMutation, updateUserMutation],
  );

  return { updateProfile };
};
