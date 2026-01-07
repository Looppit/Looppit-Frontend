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

export type OAuthSignupRequest = z.infer<typeof oAuthProviderInfoSchema>;

export const postOAuthSignupRequest = async (data: OAuthSignupRequest) => {
  const parsedData = oAuthProviderInfoSchema.parse(data);

  const response = await apiServerClient.requestRaw('/auth/signup', {
    method: 'POST',
    body: parsedData,
  });

  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader && Array.isArray(setCookieHeader)) {
    await applySetCookieHeader(setCookieHeader);
  }

  return response.data;
};
