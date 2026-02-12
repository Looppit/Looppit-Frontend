import { ImageContentType, imageContentTypeSchema } from './s3.types';

export function isImageContentType(value: unknown): value is ImageContentType {
  return imageContentTypeSchema.safeParse(value).success;
}
