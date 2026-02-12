import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { useDeleteUser, useGetUser } from '@/domains/user/hooks';
import {
  DeleteEmailUserRequestSchema,
  DeleteSnsUserRequestSchema,
} from '@/domains/user/user.types';
import {
  getFirstFormErrorMessage,
  removeTokensFromCookies,
} from '@/shared/utils';

const createDeleteAccountFormSchema = (isSnsUser: boolean) => {
  return isSnsUser ? DeleteSnsUserRequestSchema : DeleteEmailUserRequestSchema;
};

type DeleteAccountFormValues = z.infer<
  ReturnType<typeof createDeleteAccountFormSchema>
>;

export function useDeleteAccountForm() {
  const { data: user } = useGetUser();
  const { mutate: deleteUser } = useDeleteUser();

  const isSnsUser = user?.provider !== 'DEFAULT';

  const deleteAccountFormSchema = useMemo(
    () => createDeleteAccountFormSchema(isSnsUser),
    [isSnsUser],
  );

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountFormSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const handleClickDelete = form.handleSubmit(
    (data) => {
      deleteUser(isSnsUser ? {} : { password: data.password }, {
        onSuccess: async () => {
          await removeTokensFromCookies();
          window.location.href = '/';
        },
      });
    },
    (error) => {
      toast.error(getFirstFormErrorMessage(error));
    },
  );

  return {
    form,
    isSnsUser,
    handleClickDelete,
  };
}
