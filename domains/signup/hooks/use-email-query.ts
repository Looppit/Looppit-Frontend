import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmailSendRequest, postEmailCertifyRequest } from '../api';

export const useEmailSendMutation = () => {
  return useMutation({
    mutationFn: postEmailSendRequest,
    onSuccess: () => {
      toast.success('이메일 인증 메일이 발송되었습니다.');
    },
  });
};

export const useEmailCertificationMutation = () => {
  return useMutation({
    mutationFn: postEmailCertifyRequest,
  });
};
