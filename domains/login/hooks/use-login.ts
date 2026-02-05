import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiError } from '@/shared/api/api.types';
import { trackEvent } from '@/shared/lib/posthog';

import { postLogin } from '../api';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<void, ApiError, FormData>({
    mutationFn: (formData) => postLogin(formData),
    onError: (error) => {
      trackEvent('login_failed', {
        method: 'email',
        error_code: error.responseCode,
      });

      toast.error(error.message);
    },
    onSuccess: () => {
      trackEvent('login_completed', { method: 'email' });
      router.push('/');
    },
  });
};
