// @/shared/api/ApiError.ts
import { ERROR_MESSAGE_MAP } from './api.constants';
import { ApiError as ApiErrorType, ErrorStatusKey } from './api.types';

export class FetchError extends Error {
  code: ApiErrorType['code'];
  field: ApiErrorType['field'];

  constructor(status: number, field?: string) {
    const code = status as ErrorStatusKey;
    const message =
      ERROR_MESSAGE_MAP[code] || '알 수 없는 오류가 발생했습니다.';

    super(message);
    this.name = 'ApiError';
    this.code = `HTTP_${status}` as ApiErrorType['code'];
    this.field = field;
  }

  toJSON(): ApiErrorType {
    return {
      code: this.code,
      message: this.message,
      field: this.field,
    };
  }
}
