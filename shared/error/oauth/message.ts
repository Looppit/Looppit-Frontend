import {
  OAUTH_DEFAULT_ERROR_MESSAGE,
  OAUTH_USER_MESSAGE_MAP,
  type OAuthErrorCodeParam,
} from './constants';

/** OAuth 에러 코드/백엔드 responseCode → 사용자에게 보여줄 메시지 */
export const toOAuthUserMessage = (errorCode: OAuthErrorCodeParam): string => {
  return OAUTH_USER_MESSAGE_MAP[errorCode] || OAUTH_DEFAULT_ERROR_MESSAGE;
};
