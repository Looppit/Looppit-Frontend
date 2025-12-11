'use server';

import { cookies } from 'next/headers';

import { getProjectConfig, setRefreshTokenToCookie } from '@/shared/utils';

import { RefreshTokenResponse } from '../api.types';

export const fetchRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { apiEndPoint } = getProjectConfig();

  try {
    const response = await fetch(apiEndPoint + '/auth/reissue', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch refresh token');
    }

    const data = await response.json();

    await setRefreshTokenToCookie(data.refreshToken);

    return data;
  } catch (error) {
    throw error;
  }
};
