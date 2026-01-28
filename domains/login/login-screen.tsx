'use client';

import { useRouter } from 'next/navigation';

import { useOAuthError } from '@/domains/auth/oauth';
import { Button } from '@/shared/ui/button';

import { LoginForm } from './ui';

export default function LoginScreen() {
  useOAuthError();
  const router = useRouter();

  return (
    <div className="flex flex-col px-6 flex-1 overflow-y-auto pb-40">
      <div className="mt-6 mb-12">
        <h1 className="text-[22px] font-bold mb-3 tracking-tight">반가워요!</h1>
        <p className="text-secondary text-[15px] font-medium leading-relaxed">
          계정을 선택해 로그인을 진행해 주세요
        </p>
      </div>
      <LoginForm />
      <div className="text-center mt-12 pb-8 flex items-center justify-center gap-2 typography-caption-medium text-secondary">
        <span>아직 회원이 아니신가요?</span>
        <Button
          variant="ghost"
          size="caption"
          className="w-fit h-fit text-white p-0"
          onClick={() => router.push('/signup')}
        >
          가입하기
        </Button>
      </div>
    </div>
  );
}
