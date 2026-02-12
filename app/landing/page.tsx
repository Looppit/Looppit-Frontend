import { Suspense } from 'react';

import { LandingPageEffects, LandingScreen } from '@/domains/landing';

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingPageEffects />
      <LandingScreen />
    </Suspense>
  );
}
