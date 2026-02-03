import { ERROR_MESSAGE_MAP } from '@/shared/api/api.constants';

export interface ApiResponse<T> {
  responseCode: string;
  result: T;
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  responseCode?: string;
  field?: string;
}

export interface ErrorResponse {
  message?: string;
  path?: string;
  responseCode: string;
  timestamp?: string;
}

export type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 500 | 502 | 503;

export type ErrorMessageMap = Record<HttpStatusCode, string>;
export type ErrorStatusKey = keyof typeof ERROR_MESSAGE_MAP;

export type HttpErrorCode = `HTTP_${ErrorStatusKey}`;
export type ErrorCode = ErrorStatusKey | HttpErrorCode;

export type ErrorTransformer = (
  statusCode: number,
  serverMessage?: string,
) => ApiError;

export type RequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
};

/** 서버 prefetch 시 쿠키 헤더를 넘길 때 사용 */
export type ServerFetchOptions = {
  cookieHeader?: string;
};

export type QueryValue = string | number | boolean | null | undefined;
