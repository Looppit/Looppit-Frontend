import axios, { AxiosInstance } from "axios";

import {
  API_BASE_URL,
  API_TIMEOUT,
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGE_MAP,
} from "./api.constants";
import type { ApiError, ErrorResponse, ErrorStatusKey } from "./api.types";

export const transformError = (
  statusCode: ErrorStatusKey,
  serverMessage?: string
): ApiError => {
  const statusKey = statusCode;
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
  response: { status: ErrorStatusKey; data: unknown };
}) => {
  const { status, data } = error.response;

  if (status === 401) {
    handleUnauthorized();
  }

  const errorResponse = data as ErrorResponse | undefined;
  const apiError = errorResponse?.error || transformError(status);

  return Promise.reject(apiError);
};

export const initAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
