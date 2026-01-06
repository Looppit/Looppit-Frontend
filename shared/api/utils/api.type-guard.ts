import { ERROR_MESSAGE_MAP } from '../api.constants';
import { ErrorStatusKey } from '../api.types';

export function isErrorStatusKey(
  statusCode: number,
): statusCode is ErrorStatusKey {
  return statusCode in ERROR_MESSAGE_MAP;
}
