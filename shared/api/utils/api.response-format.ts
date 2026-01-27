import { getErrorMessage } from '@/shared/utils';

import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGE_MAP } from '../api.constants';
import { ApiError, ApiResponse } from '../api.types';
import { getErrorCode } from './api.error';
import { isErrorStatusKey } from './api.type-guard';

export const createApiResponse = <T>(
  result: T,
  responseCode = 'SUCCESS',
): ApiResponse<T> => {
  return {
    responseCode,
    result,
  };
};

export const createApiError = (
  error: unknown,
  defaultMessage = DEFAULT_ERROR_MESSAGE,
): ApiError => {
  const errorCode = getErrorCode(error);
  const defaultErrorMessage = isErrorStatusKey(errorCode)
    ? ERROR_MESSAGE_MAP[errorCode]
    : defaultMessage;

  return {
    code: errorCode,
    message: getErrorMessage(error, defaultErrorMessage),
  };
};
