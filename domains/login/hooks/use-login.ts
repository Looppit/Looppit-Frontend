import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { isApiError } from '@/shared/guard';

import { postLogin } from '../api';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => postLogin(formData),
    onError: (error) => {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};
