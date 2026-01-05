import {
  OAuthSignupRequest,
  postOAuthSignupRequest,
} from '@/domains/auth/auth.api';
import { ONE_MONTH_SECONDS } from '@/shared/constants/time';
import { setCookie } from '@/shared/utils/cookie';

export interface OAuthExchangeResult {
  redirectUrl: URL;
}

export const exchangeOAuthToken = async (
  params: OAuthSignupRequest,
  baseUrl: string,
): Promise<OAuthExchangeResult> => {
  const { email, providerId, provider } = params;

  const {
    result: { accessToken, refreshToken },
  } = await postOAuthSignupRequest({
    email,
    providerId,
    provider,
  });

  await setCookie('refreshToken', refreshToken, {
    maxAge: ONE_MONTH_SECONDS,
    httpOnly: true,
  });

  const redirectUrl = new URL('/oauth/bridge', baseUrl);
  redirectUrl.searchParams.set('accessToken', accessToken);

  return { redirectUrl };
};
