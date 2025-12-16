import {
  SOCIAL_PROVIDER_GOOGLE,
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
  SocialProvider,
} from '@/domains/auth';

import {
  KAKAO_DEFAULT_ERROR_MESSAGE,
  KAKAO_ERROR_MESSAGES,
} from '../constants/kakao.constants';

export const getSocialProviderStyles = (provider: SocialProvider): string => {
  switch (provider) {
    case SOCIAL_PROVIDER_GOOGLE:
      return 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700';
    case SOCIAL_PROVIDER_KAKAO:
      return 'bg-[#FEE500] text-[#000000] hover:bg-[#FDD835]';
    case SOCIAL_PROVIDER_NAVER:
      return 'bg-[#03C75A] text-white hover:bg-[#02B350]';
    default:
      return '';
  }
};

export const getKakaoErrorMessage = (error: string): string => {
  return KAKAO_ERROR_MESSAGES[error] ?? KAKAO_DEFAULT_ERROR_MESSAGE;
};
