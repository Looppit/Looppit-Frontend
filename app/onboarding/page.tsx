'use client';

import { Suspense } from 'react';

import { OnboardingPageEffects } from '@/domains/onboarding/onboarding-page-effects';
import { OnboardingScreen } from '@/domains/onboarding/onboarding-screen';

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingPageEffects />
      <OnboardingScreen />
    </Suspense>
  );
}
