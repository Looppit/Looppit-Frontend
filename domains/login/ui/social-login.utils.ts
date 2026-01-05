import type { SocialProvider } from '@/domains/auth/auth.types';

export const getSocialProviderStyles = (provider: SocialProvider): string => {
  switch (provider) {
    case 'kakao':
      return 'bg-[#FEE500] text-[#000000] hover:bg-[#FDD835]';
    case 'naver':
      return 'bg-[#03C75A] text-white hover:bg-[#02B350]';
    default:
      return '';
  }
};

