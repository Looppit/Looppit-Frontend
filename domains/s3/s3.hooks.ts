import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getS3ErrorMessage } from '@/domains/s3/s3.utils';
import { ApiError } from '@/shared/api/api.types';

import { createPresignedUrl, uploadFileWithPresignedUrl } from './s3.api';
import {
  CreatePresignedUrlRequest,
  PresignedUrlResponse,
  UploadFileWithPresignedUrlRequest,
} from './s3.types';

export const useCreatePresignedUrl = () => {
  return useMutation<PresignedUrlResponse, ApiError, CreatePresignedUrlRequest>(
    {
      mutationFn: createPresignedUrl,
      onError: (error) => {
        console.error(error);
        toast.error(getS3ErrorMessage(error));
      },
    },
  );
};

export const useUploadFileWithPresignedUrl = () => {
  return useMutation<void, ApiError, UploadFileWithPresignedUrlRequest>({
    mutationFn: uploadFileWithPresignedUrl,
    onError: (error) => {
      console.error(error);
      toast.error(getS3ErrorMessage(error));
    },
  });
};
