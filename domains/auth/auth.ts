import NextAuth from 'next-auth';

import { ENVS } from '@/shared/constants';

import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: ENVS.NEXT_AUTH.SECRET,
});
