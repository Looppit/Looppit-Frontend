export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface ErrorResponse {
  error: ApiError;
  timestamp?: string;
}

export type HttpStatusCode = 400 | 401 | 403 | 404 | 500 | 502 | 503;

export type ErrorMessageMap = Record<HttpStatusCode, string>;

export type ErrorTransformer = (
  statusCode: number,
  serverMessage?: string
) => ApiError;
