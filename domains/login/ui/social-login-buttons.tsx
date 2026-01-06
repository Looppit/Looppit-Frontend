'use client';

import { SocialProvider } from '@/domains/auth';
import {
  SOCIAL_PROVIDER_KAKAO,
  SOCIAL_PROVIDER_NAVER,
} from '@/domains/auth/oauth';
import { handleKakaoLogin, handleNaverLogin } from '@/domains/auth/oauth';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

import { getSocialProviderStyles } from '../social-login.utils';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  label: string;
}

const SOCIAL_LOGIN_HANDLERS: Record<SocialProvider, () => Promise<void>> = {
  [SOCIAL_PROVIDER_KAKAO]: handleKakaoLogin,
  [SOCIAL_PROVIDER_NAVER]: handleNaverLogin,
};

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center">
        <Separator className="w-full" />
        <span className="absolute bg-white px-2 text-sm text-gray-500 dark:bg-black dark:text-gray-400">
          또는
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <SocialLoginButton
          provider={SOCIAL_PROVIDER_KAKAO}
          label="카카오로 로그인"
        />
        <SocialLoginButton
          provider={SOCIAL_PROVIDER_NAVER}
          label="네이버로 로그인"
        />
      </div>
    </div>
  );
}

const SocialLoginButton = ({ provider, label }: SocialLoginButtonProps) => {
  const handleSocialLogin = async () => {
    await SOCIAL_LOGIN_HANDLERS[provider]();
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full ${getSocialProviderStyles(provider)}`}
      onClick={handleSocialLogin}
    >
      {label}
    </Button>
  );
};
