'use server';

import { z } from 'zod';

import { apiServerClient } from '@/shared/api/api.server-client';
import { applySetCookieHeader } from '@/shared/utils';

import { ACCOUNT_PROVIDERS } from '../auth.types';

const oAuthProviderInfoSchema = z.object({
  provider: z.enum(ACCOUNT_PROVIDERS),
  providerId: z.string(),
  email: z.string(),
});

const oAuthSignupResponseSchema = z.object({
  result: z.object({
    isNewMember: z.boolean(),
  }),
});

export type OAuthSignupRequest = z.infer<typeof oAuthProviderInfoSchema>;
export type OAuthSignupResponse = z.infer<typeof oAuthSignupResponseSchema>;

export const postOAuthSignupRequest = async (
  data: OAuthSignupRequest,
): Promise<OAuthSignupResponse> => {
  const parsedData = oAuthProviderInfoSchema.parse(data);

  const response = await apiServerClient.requestRaw('/auth/signup', {
    method: 'POST',
    body: parsedData,
  });

  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader && Array.isArray(setCookieHeader)) {
    await applySetCookieHeader(setCookieHeader);
  }

  return oAuthSignupResponseSchema.parse(response.data);
};
