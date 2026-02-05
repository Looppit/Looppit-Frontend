'use client';

import { useEffect } from 'react';

import { useGetUser } from '@/domains/user/hooks';

import { identifyUser } from './identify';

export const usePostHogUserIdentify = () => {
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      identifyUser(data);
    }
  }, [data]);
};
