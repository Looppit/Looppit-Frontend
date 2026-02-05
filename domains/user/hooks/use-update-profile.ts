import { useCallback } from 'react';

import {
  useCreatePresignedUrl,
  useUploadFileWithPresignedUrl,
} from '@/domains/s3/s3.hooks';
import { getImageContentType } from '@/domains/s3/s3.utils';

import { useUpdateUser } from './use-user-query';
import { UpdateUserRequest, UserProfileFormValues } from '../user.types';

type UpdateProfileOptions = {
  form: UserProfileFormValues;
  onSuccess?: () => void;
};

/**
 * 유저 프로필 업데이트 훅
 * 발급받은 presigned url을 사용하여 이미지를 업로드 하고, 유저 프로필을 업데이트 과정을 동기적으로 진행하는 훅
 */
export const useUpdateProfile = () => {
  const {
    mutateAsync: createPresignedUrlMutation,
    isPending: isCreatingPresignedUrl,
  } = useCreatePresignedUrl();
  const {
    mutateAsync: uploadFileWithPresignedUrlMutation,
    isPending: isUploadingFile,
  } = useUploadFileWithPresignedUrl();
  const { mutate: updateUserMutation, isPending: isUpdatingUser } =
    useUpdateUser();

  const uploadFile = useCallback(
    async (imgPath: File) => {
      const contentType = getImageContentType(imgPath);
      const {
        result: { url, key },
      } = await createPresignedUrlMutation({
        fileName: imgPath.name,
        contentType,
      });

      await uploadFileWithPresignedUrlMutation({ url, file: imgPath });
      return key;
    },
    [createPresignedUrlMutation, uploadFileWithPresignedUrlMutation],
  );

  const updateProfileMutations = useCallback(
    async ({ form, onSuccess }: UpdateProfileOptions) => {
      try {
        const { imgPath } = form;
        const requestData: UpdateUserRequest = {
          ...form,
          imgPath: null,
        };
        if (imgPath instanceof File) {
          const key = await uploadFile(imgPath);
          requestData.imgPath = key;
        }

        updateUserMutation(requestData, { onSuccess });
      } catch (error) {
        console.error(error);
      }
    },
    [uploadFile, updateUserMutation],
  );

  return {
    updateProfileMutations,
    isPending: isCreatingPresignedUrl || isUploadingFile || isUpdatingUser,
  };
};
