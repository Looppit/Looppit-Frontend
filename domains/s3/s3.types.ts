import { z } from 'zod';

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
});

export type PresignedUrlResponse = z.infer<typeof presignedUrlSchema>;
