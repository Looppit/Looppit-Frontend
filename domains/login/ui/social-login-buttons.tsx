'use client';

import { signIn } from 'next-auth/react';

import type { SocialProvider } from '@/domains/auth/auth.types';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

import { getSocialProviderStyles } from './social-login.utils';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  label: string;
}

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
        <SocialLoginButton provider="kakao" label="카카오로 로그인" />
        <SocialLoginButton provider="naver" label="네이버로 로그인" />
      </div>
    </div>
  );
}

const SocialLoginButton = ({ provider, label }: SocialLoginButtonProps) => {
  const handleSocialLogin = async () => {
    await signIn(provider, {
      callbackUrl: '/',
    });
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
