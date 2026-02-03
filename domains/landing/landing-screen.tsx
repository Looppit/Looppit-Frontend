'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SocialLoginButtons from '@/domains/login/ui/social-login-buttons';
import { Button } from '@/shared/ui/button';
import { Spacing } from '@/shared/ui/spacing';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-20 pb-12 bg-background text-white">
      <div>
        <div className="relative flex flex-col items-center justify-center py-6 w-full">
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-white/4 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
            <Image
              className="w-full h-full object-cover opacity-50 mix-blend-screen scale-110 z-1"
              src="/assets/login-logo.png"
              alt="Looppit Logo"
              width={120}
              height={120}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
          </div>
        </div>
        <Spacing size={42} />
        <div className="flex flex-col items-center text-center gap-4 px-4">
          <h2 className="text-[20px] font-bold tracking-tight">
            루핏으로 작은 습관부터 시작해요
          </h2>
          <p className="text-secondary text-[15px] font-medium leading-relaxed opacity-80 max-w-[280px]">
            매일 할 일을 기록하고,
            <br />
            자연스럽게 습관으로 이어가 보세요
          </p>
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-end">
        <SocialLoginButtons />
        <Button
          onClick={() => router.push('/login')}
          variant="ghost"
          className="mt-4 text-[14px] font-bold text-secondary/70 hover:text-white transition-colors pb-0.5 tracking-tight"
        >
          이메일로 로그인하기
        </Button>
      </div>
    </div>
  );
}
