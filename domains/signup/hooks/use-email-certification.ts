import { useMutation } from '@tanstack/react-query';

import { postEmailCertifyRequest } from '../api/email';

export const useEmailCertificationMutation = () => {
  return useMutation({
    mutationFn: postEmailCertifyRequest,
  });
};
