import { apiClient } from '@/shared/api/api.client';
import { apiServerClient } from '@/shared/api/api.server-client';

import {
  CreatePresignedUrlRequest,
  PresignedUrlResponse,
  UploadFileWithPresignedUrlRequest,
} from './s3.types';

export const createPresignedUrl = async (
  request: CreatePresignedUrlRequest,
) => {
  return await apiClient.post<PresignedUrlResponse>(
    '/s3/presigned-url',
    request,
  );
};

export const uploadFileWithPresignedUrl = async ({
  url,
  file,
}: UploadFileWithPresignedUrlRequest) => {
  await apiServerClient.requestRaw(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
};
