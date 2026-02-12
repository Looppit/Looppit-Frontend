import { FormEvent, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { useDeleteUser, useGetUser } from '@/domains/user/hooks';
import {
  DeleteEmailUserRequestSchema,
  DeleteSnsUserRequestSchema,
} from '@/domains/user/user.types';
import { getFormValidationMessage } from '@/shared/lib';
import { removeTokensFromCookies } from '@/shared/utils';

const createDeleteAccountFormSchema = (isSnsUser: boolean) => {
  return isSnsUser ? DeleteSnsUserRequestSchema : DeleteEmailUserRequestSchema;
};

type DeleteAccountFormValues = z.infer<
  ReturnType<typeof createDeleteAccountFormSchema>
>;

export const useDeleteAccountForm = () => {
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

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      form.handleSubmit(
        (data) => {
          deleteUser(isSnsUser ? {} : { password: data.password }, {
            onSuccess: async () => {
              await removeTokensFromCookies();
              window.location.href = '/';
            },
          });
        },
        (error) => {
          toast.error(getFormValidationMessage(error));
        },
      )(e);
    },
    [deleteUser, form, isSnsUser],
  );

  return {
    form,
    isSnsUser,
    handleSubmit,
  };
};
