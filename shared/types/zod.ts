import { ZodIssueCode } from 'zod/v3';

export type ExtendedZodCode = ZodIssueCode | 'default' | 'server';
export type ExtendedZodErrorMessageMap = Record<ExtendedZodCode, string>;
