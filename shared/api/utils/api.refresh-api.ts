'use server';

import { cookies } from 'next/headers';

import { apiServerClient } from '@/shared/api/api.server-client';
import { applySetCookieHeader, removeTokensFromCookies } from '@/shared/utils';

export async function postReissue() {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const response = await apiServerClient.requestRaw('/auth/reissue', {
      method: 'POST',
      headers: {
        Cookie: cookieString,
      },
    });
    const setCookieHeaders = response.headers['set-cookie'];

    if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
      await applySetCookieHeader(setCookieHeaders);
    }

    return response.data;
  } catch (error) {
    await removeTokensFromCookies();

    throw error;
  }
}
