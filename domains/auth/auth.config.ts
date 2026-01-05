import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

import { AccountProvider } from '@/domains/auth/auth.types';
import { PROJECT_PRIVATE_ENV } from '@/shared/constants/environment.server';
import { buildUrl } from '@/shared/utils';

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [
    Kakao({
      clientId: PROJECT_PRIVATE_ENV.kakao.id,
      clientSecret: PROJECT_PRIVATE_ENV.kakao.secret,
    }),
    Naver({
      clientId: PROJECT_PRIVATE_ENV.naver.id,
      clientSecret: PROJECT_PRIVATE_ENV.naver.secret,
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

      const baseUrl = PROJECT_PRIVATE_ENV.nextauth.baseUrl;
      if (!baseUrl) return false;

      return buildUrl(baseUrl, '/api/auth/oauth/exchange', {
        email,
        providerId,
        provider,
      });
    },
  },
} satisfies NextAuthConfig;
