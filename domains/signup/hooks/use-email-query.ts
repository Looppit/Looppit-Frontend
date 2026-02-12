import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EmailCertifyRequest, EmailSendRequest } from '@/domains/signup/types';
import { getUserApiErrorMessage } from '@/domains/user/utils';
import { ApiError } from '@/shared/api/api.types';

import { postEmailSendRequest, postEmailCertifyRequest } from '../api';

export const useEmailSendMutation = () => {
  return useMutation<void, ApiError, EmailSendRequest>({
    mutationFn: postEmailSendRequest,
    onSuccess: () => {
      toast.success('이메일 인증 메일이 발송되었어요');
    },
    onError: (error) => {
      toast.error(getUserApiErrorMessage(error, '이메일 전송에 실패했어요'));
    },
  });
};

export const useEmailCertificationMutation = () => {
  return useMutation<void, ApiError, EmailCertifyRequest>({
    mutationFn: postEmailCertifyRequest,
    onError: (error) => {
      toast.error(getUserApiErrorMessage(error, '이메일 전송에 실패했어요'));
    },
  });
};
