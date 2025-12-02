import { ZodIssueCode } from 'zod/v3';

export type ExtendedZodErrorMessageMap = Record<
  ZodIssueCode | 'default' | 'server',
  string
>;
