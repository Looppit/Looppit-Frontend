import { LoginFormValues } from '../login.types';

export type LoginRequest = LoginFormValues;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
