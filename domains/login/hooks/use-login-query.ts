import { useMutation } from '@tanstack/react-query';

import { loginAction } from '../api';

export const useLogin = () => {
  return useMutation({
    mutationFn: (formData: FormData) => loginAction(formData),
  });
};
