import type { ApiError, ErrorResponse } from "./api.types";
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGE_MAP } from "./api.constants";

export const transformError = (
  statusCode: number,
  serverMessage?: string
): ApiError => {
  const statusKey = statusCode as keyof typeof ERROR_MESSAGE_MAP;
  const message = ERROR_MESSAGE_MAP[statusKey] || DEFAULT_ERROR_MESSAGE;

  return {
    code: `HTTP_${statusCode}`,
    message: serverMessage || message,
  };
};

export const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const handleNetworkError = () => {
  return Promise.reject(transformError(503, "네트워크 연결을 확인해주세요."));
};

export const handleResponseError = (error: {
  response: { status: number; data: unknown };
}) => {
  const { status, data } = error.response;

  if (status === 401) {
    handleUnauthorized();
  }

  const errorResponse = data as ErrorResponse | undefined;
  const apiError = errorResponse?.error || transformError(status);

  return Promise.reject(apiError);
};
