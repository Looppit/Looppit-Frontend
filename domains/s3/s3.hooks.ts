import { useMutation } from '@tanstack/react-query';

import { createPresignedUrl } from './s3.api';
import { CreatePresignedUrlRequest, PresignedUrlResponse } from './s3.types';

export const useCreatePresignedUrl = () => {
  return useMutation<PresignedUrlResponse, Error, CreatePresignedUrlRequest>({
    mutationFn: createPresignedUrl,
  });
};
