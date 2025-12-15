export { handlers } from '@/domains/auth/auth';
export { auth, signIn, signOut } from './auth';
export { authConfig } from './auth.config';
export { OAUTH_ERROR_CODES } from './oauth.constants';
export type { OAuthErrorCode } from './oauth.constants';
export {
  classifyOAuthError,
  getOAuthErrorMessage,
} from './oauth.error';
export type { OAuthError } from './oauth.error';
export { exchangeOAuthToken } from './oauth.service';
export type { OAuthExchangeResult } from './oauth.service';
export { parseOAuthParams } from './oauth.utils';
