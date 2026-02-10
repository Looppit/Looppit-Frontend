import { SignupFormValues } from './schema';

export type SignupRequest = SignupFormValues;

export type SignupResponse = {
  id: string;
  email: string;
  password: string;
};

export type EmailSendRequest = {
  email: string;
};

export type EmailCertifyRequest = {
  email: string;
  code: string;
};
