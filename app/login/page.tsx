import { Suspense } from 'react';

import { LoginScreen } from '@/domains/login';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginScreen />
    </Suspense>
  );
}
