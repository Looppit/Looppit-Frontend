import { useMutation } from '@tanstack/react-query';

import { postEmailSendRequest, postEmailCertifyRequest } from '../api';

export const useEmailSendMutation = () => {
  return useMutation({
    mutationFn: postEmailSendRequest,
  });
};

export const useEmailCertificationMutation = () => {
  return useMutation({
    mutationFn: postEmailCertifyRequest,
  });
};
