import { apiClient } from '@/shared/api/api.client';

export const processLogin = async (formData: FormData) => {
  return await apiClient.post('/user/login', formData);
};
