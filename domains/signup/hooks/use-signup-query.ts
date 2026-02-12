import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postSignupRequest } from '@/domains/signup/api';
import { SignupRequest } from '@/domains/signup/types';
import { getUserApiErrorMessage } from '@/domains/user/utils';
import { ApiError } from '@/shared/api/api.types';
import { trackEvent } from '@/shared/lib/posthog';

export const useSignup = () => {
  const router = useRouter();

  return useMutation<void, ApiError, SignupRequest>({
    mutationFn: (data: SignupRequest) => postSignupRequest(data),
    onSuccess: () => {
      trackEvent('signup_completed', { method: 'email' });
      toast.success('회원가입이 완료되었어요.');
      router.push('/onboarding');
    },
    onError: (error) => {
      trackEvent('signup_failed', {
        method: 'email',
        error_code: error.responseCode,
      });
      toast.error(getUserApiErrorMessage(error, '회원가입에 실패했어요'));
    },
  });
};
