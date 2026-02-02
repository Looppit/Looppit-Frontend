import axios from 'axios';

import { apiClient } from '@/shared/api/api.client';

import { CreatePresignedUrlRequest, PresignedUrlResponse } from './s3.types';

export const createPresignedUrl = async (
  request: CreatePresignedUrlRequest,
) => {
  return await apiClient.post<PresignedUrlResponse>(
    '/s3/presigned-url',
    request,
  );
};

export const uploadFileWithPresignedUrl = async (url: string, file: File) => {
  return await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
