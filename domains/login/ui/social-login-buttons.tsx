'use client';

import { SocialProvider } from '@/domains/auth';
import {
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
} from '@/domains/auth/oauth';
import { handleKakaoLogin, handleNaverLogin } from '@/domains/auth/oauth';
import { trackEvent } from '@/shared/lib/posthog';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

import { getSocialProviderStyles } from '../social-login.utils';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  label: string;
}

const SOCIAL_LOGIN_HANDLERS: Record<SocialProvider, () => Promise<void>> = {
  [SOCIAL_PROVIDER_KAKAO]: handleKakaoLogin,
  [SOCIAL_PROVIDER_NAVER]: handleNaverLogin,
};

const SOCIAL_LOGIN_ICONS: Record<SocialProvider, 'ic_kakao' | 'ic_naver'> = {
  [SOCIAL_PROVIDER_KAKAO]: 'ic_kakao',
  [SOCIAL_PROVIDER_NAVER]: 'ic_naver',
};

export default function SocialLoginButtons() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-2">
        <SocialLoginButton
          provider={SOCIAL_PROVIDER_KAKAO}
          label="카카오로 시작하기"
        />
        <SocialLoginButton
          provider={SOCIAL_PROVIDER_NAVER}
          label="네이버로 시작하기"
        />
      </div>
    </div>
  );
}

const SocialLoginButton = ({ provider, label }: SocialLoginButtonProps) => {
  const handleSocialLogin = async () => {
    trackEvent('login_started', {
      method: provider,
    });
    await SOCIAL_LOGIN_HANDLERS[provider]();
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full ${getSocialProviderStyles(provider)}`}
      onClick={handleSocialLogin}
    >
      <Icon icon={SOCIAL_LOGIN_ICONS[provider]} />
      {label}
    </Button>
  );
};
