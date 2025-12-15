import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

import { AccountProvider } from '@/domains/auth/auth.types';
import { ENVS } from '@/shared/constants';
import { buildUrl } from '@/shared/utils';

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [
    Google({
      clientId: ENVS.GOOGLE.ID,
      clientSecret: ENVS.GOOGLE.SECRET,
    }),
    Kakao({
      clientId: ENVS.KAKAO.ID,
      clientSecret: ENVS.KAKAO.SECRET,
    }),
    Naver({
      clientId: ENVS.NAVER.ID,
      clientSecret: ENVS.NAVER.SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email;
      const providerId = account?.providerAccountId;
      const provider = account?.provider as AccountProvider;

      if (!email || !providerId || !provider) return false;

      const baseUrl = ENVS.NEXT_AUTH.BASE_URL;
      if (!baseUrl) return false;

      return buildUrl(baseUrl, '/api/auth/oauth/exchange', {
        email,
        providerId,
        provider,
      });
    },
  },
} satisfies NextAuthConfig;
