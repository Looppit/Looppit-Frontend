import { isImageContentType } from './s3.type-gaurd';
import { ImageContentType } from './s3.types';

export const getImageContentType = (file: File): ImageContentType => {
  const contentType = file.type.split('/')[1].toUpperCase();
  if (isImageContentType(contentType)) {
    return contentType;
  }
  throw new Error('올바르지 않은 이미지 파일입니다.');
};
