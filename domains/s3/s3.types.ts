import { z } from 'zod';

import { ApiResponse } from '@/shared/api/api.types';

export const imageContentTypeSchema = z.enum(['JPG', 'PNG', 'JPEG']);

export type ImageContentType = z.infer<typeof imageContentTypeSchema>;

export const createPresignedUrlRequestSchema = z.object({
  fileName: z.string(),
  contentType: imageContentTypeSchema,
});

export type CreatePresignedUrlRequest = z.infer<
  typeof createPresignedUrlRequestSchema
>;

export const presignedUrlSchema = z.object({
  url: z.string(),
  key: z.string(),
});

export type PresignedUrlResponse = ApiResponse<
  z.infer<typeof presignedUrlSchema>
>;

export const uploadFileWithPresignedUrlRequestSchema = z.object({
  url: z.string(),
  file: z.instanceof(File),
});

export type UploadFileWithPresignedUrlRequest = z.infer<
  typeof uploadFileWithPresignedUrlRequestSchema
>;
