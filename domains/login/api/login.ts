import { apiNextServerClient } from '@/shared/api/api.next-server-client';

export const postLogin = async (formData: FormData) => {
  return await apiNextServerClient.post('/auth/login', formData, {
    'Content-Type': 'multipart/form-data',
  });
};
