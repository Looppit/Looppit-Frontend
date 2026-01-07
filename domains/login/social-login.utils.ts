import { SocialProvider } from '@/domains/auth';
import {
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
} from '@/domains/auth/oauth';

export const getSocialProviderStyles = (provider: SocialProvider): string => {
  switch (provider) {
    case SOCIAL_PROVIDER_KAKAO:
      return 'bg-[#FEE500] text-[#000000] hover:bg-[#FDD835]';
    case SOCIAL_PROVIDER_NAVER:
      return 'bg-[#03C75A] text-white hover:bg-[#02B350]';
    default:
      return '';
  }
};
