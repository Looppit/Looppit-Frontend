import { useMutation } from '@tanstack/react-query';

import { postEmailSendRequest } from '../api/email';

export const useEmailSendMutation = () => {
  return useMutation({
    mutationFn: postEmailSendRequest,
  });
};
