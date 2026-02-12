import type { ApiError } from '@/shared/api/api.types';
import { toApiErrorUserMessage } from '@/shared/error';

import { isImageContentType } from './s3.type-guard';
import { ImageContentType } from './s3.types';

export const getImageContentType = (file: File): ImageContentType => {
  const contentType = file.type.split('/')[1].toUpperCase();
  if (isImageContentType(contentType)) {
    return contentType;
  }
  throw new Error('올바르지 않은 이미지 파일입니다.');
};

/**
 * S3 도메인 API 에러 → 사용자에게 보여줄 메시지
 */
export const getS3ErrorMessage = (
  error: ApiError,
  defaultMessage = '파일을 업로드하는 과정에서 오류가 발생했어요. 다시 시도해주세요.',
): string => {
  return toApiErrorUserMessage('S3', error, defaultMessage);
};
