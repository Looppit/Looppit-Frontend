import { NextRequest } from 'next/server';

import { OAuthSignupRequest } from '@/domains/auth/auth.api';
import { ACCOUNT_PROVIDERS, AccountProvider } from '@/domains/auth/auth.types';
import { createTypeValidator, requireSearchParams } from '@/shared/utils';

const isValid = createTypeValidator<AccountProvider>(ACCOUNT_PROVIDERS);

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
