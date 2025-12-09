'use client';

import { Spacing } from '@/shared/ui/spacing';

import { LoginForm } from './ui';

export default function LoginScreen() {
  return (
    <div className="flex flex-col gap-6 px-6">
      <Spacing size={157} />
      <h1 className="text-2xl font-bold">
        우리 App
        <br /> 표어나 설명문구
      </h1>
      <Spacing size={157} />
      <LoginForm />
    </div>
  );
}
