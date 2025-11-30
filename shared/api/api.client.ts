import axios from "axios";

import { handleNetworkError, handleResponseError } from "./api.utils";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return handleNetworkError();
    }

    return handleResponseError(error);
  }
);
