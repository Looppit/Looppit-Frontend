import NextAuth from 'next-auth';

import { PROJECT_PRIVATE_ENV } from '@/shared/constants/environment.server';

import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: PROJECT_PRIVATE_ENV.nextauth.secret,
});
