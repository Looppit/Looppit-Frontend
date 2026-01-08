import { apiClient } from '@/shared/api/api.client';

export const postLogin = async (formData: FormData) => {
  return await apiClient.post('/user/login', formData);
};
