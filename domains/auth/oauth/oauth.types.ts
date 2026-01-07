import { KakaoErrorCode } from './kakao.constants';

export type KakaoLoginResponse = {
  success: true;
  data: {
    providerId: number;
    email: string;
  };
  error?: KakaoErrorCode;
};

export interface OAuthExchangeResult {
  redirectUrl: URL;
}
