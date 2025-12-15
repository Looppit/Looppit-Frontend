import { NextRequest } from 'next/server';

import { OAuthSignupRequest } from '@/domains/auth/auth.api';
import { ACCOUNT_PROVIDERS, AccountProvider } from '@/domains/auth/auth.types';
import { ENVS } from '@/shared/constants';
import { createTypeValidator, requireSearchParams } from '@/shared/utils';

const isValid = createTypeValidator<AccountProvider>(ACCOUNT_PROVIDERS);

export const buildOAuthCallbackUrl = (
  email: string,
  providerId: string,
  provider: AccountProvider,
): string => {
  const callbackUrl = new URL(
    '/api/auth/oauth/exchange',
    ENVS.NEXT_AUTH.BASE_URL,
  );
  callbackUrl.searchParams.set('email', email);
  callbackUrl.searchParams.set('providerId', providerId);
  callbackUrl.searchParams.set('provider', provider);

  return callbackUrl.toString();
};

export const parseOAuthParams = (
  request: NextRequest,
): OAuthSignupRequest | null => {
  const params = requireSearchParams(request, [
    'email',
    'providerId',
    'provider',
  ]);

  if (!params) {
    return null;
  }

  const providerValue = params.provider.toUpperCase();

  if (!isValid(providerValue)) {
    return null;
  }

  return {
    email: params.email,
    providerId: params.providerId,
    provider: providerValue,
  };
};
