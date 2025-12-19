import { LoginResponse } from '../types';

export function isLoginResponse(response: unknown): response is LoginResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'accessToken' in response &&
    'refreshToken' in response
  );
}
