import { SignupFormValues } from './schema';

export type SignupRequest = SignupFormValues;

export type SignupResponse = {
  id: string;
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  email: string;
};

export type VerifyEmailResponse = unknown;
