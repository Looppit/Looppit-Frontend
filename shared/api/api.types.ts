import { AllBackendErrorCodes, HTTP_ERROR_MESSAGE_MAP } from './api.constants';

export interface ApiResponse<T> {
  responseCode: string;
  result: T;
}

export interface ApiError {
  code: HTTPErrorCode;
  message: string;
  responseCode?: AllBackendErrorCodes;
}

export interface ErrorResponse {
  message?: string;
  path?: string;
  responseCode: string;
  timestamp?: string;
}

export type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 500 | 502 | 503;

export type HTTPErrorMessageMap = Record<HttpStatusCode, string>;
export type HTTPErrorCode = keyof typeof HTTP_ERROR_MESSAGE_MAP;

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
