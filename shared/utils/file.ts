export function isImageFile(file: File) {
  return file.type.startsWith('image/');
}

export function isValidImageType(file: File) {
  return [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/heic',
    'image/heif',
  ].includes(file.type);
}

export function isWithinFileSize(
  file: File,
  maxSize: number = 5 * 1024 * 1024,
): boolean {
  return file.size <= maxSize;
}

export function getImageFileValidatorError(file?: File): string | undefined {
  if (!file) {
    return undefined;
  }
  if (!isImageFile(file)) {
    return '이미지 파일만 업로드할 수 있습니다.';
  }
  if (!isValidImageType(file)) {
    return '지원하지 않는 이미지 파일 형식입니다.';
  }
  if (!isWithinFileSize(file)) {
    return '이미지 파일 크기는 10MB를 초과할 수 없습니다.';
  }
  return undefined;
}
