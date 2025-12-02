'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Spacing } from '@/shared/ui/spacing';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Spacing size={183} />
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <Button
          className="w-[298px] h-[48px]"
          onClick={() => router.push('/login')}
        >
          로그인
        </Button>
        <Button
          className="w-[298px] h-[48px]"
          onClick={() => router.push('/signup')}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
