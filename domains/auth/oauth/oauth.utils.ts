import { toast } from 'sonner';

import {
  KAKAO_DEFAULT_ERROR_MESSAGE,
  KAKAO_ERROR_MESSAGES,
  KakaoErrorCode,
} from '@/domains/auth/oauth/kakao.constants';
import { OAUTH_DEFAULT_ERROR_MESSAGE } from '@/shared/error';
import { getErrorMessage } from '@/shared/utils';

/**
 * 에러를 처리하고 사용자에게 토스트 알림을 표시합니다.
 */
export const handleOauthError = (error: unknown) => {
  const errorMessage = getErrorMessage(error, OAUTH_DEFAULT_ERROR_MESSAGE);
  toast.error(errorMessage);
};

export const getKakaoErrorMessage = (error: KakaoErrorCode): string => {
  return KAKAO_ERROR_MESSAGES[error] ?? KAKAO_DEFAULT_ERROR_MESSAGE;
};
