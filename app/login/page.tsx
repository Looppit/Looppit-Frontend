import { Suspense } from 'react';

import { LoginPageEffects, LoginScreen } from '@/domains/login';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageEffects />
      <LoginScreen />
    </Suspense>
  );
}
