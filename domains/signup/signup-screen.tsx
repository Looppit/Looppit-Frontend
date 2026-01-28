'use client';

import { SignupForm } from './ui';

export default function SignupScreen() {
  return (
    <div className="flex flex-col px-6 flex-1 overflow-y-auto pb-40">
      <div className="mt-6 mb-12">
        <h1 className="text-[22px] font-bold mb-3 tracking-tight">반가워요!</h1>
        <p className="text-secondary text-[15px] font-medium leading-relaxed">
          루핏과 함께 새로운 내일을 준비해요
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
