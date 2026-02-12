import {
  BACKEND_ERROR,
  type AllBackendErrorCodes,
} from '@/shared/api/api.constants';

export type BackendErrorMessageMap = Record<AllBackendErrorCodes, string>;

const flattenBackendErrorMessages = (): BackendErrorMessageMap => {
  return Object.fromEntries(
    Object.values(BACKEND_ERROR).flatMap((domain) => Object.entries(domain)),
  ) as BackendErrorMessageMap;
};

export const BACKEND_ERROR_MESSAGES = flattenBackendErrorMessages();
