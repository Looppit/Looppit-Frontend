import { useCallback } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useGetUser } from '@/domains/user/hooks/use-user-query';
import { getFormValidationMessage } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/posthog/events';

import {
  HELP_FORM_ID,
  HELP_SUCCESS_MESSAGE,
} from '../constants/help.constants';
import { helpFormSchema, HelpFormValues } from '../help.types';

export const useHelpForm = () => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const form = useForm<HelpFormValues>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      inquiry: '',
    },
  });

  const onInvalid = useCallback((errors: FieldErrors) => {
    toast.error(getFormValidationMessage(errors));
  }, []);

  const onSubmit = useCallback(
    (data: HelpFormValues) => {
      trackEvent('custom_form_submitted', {
        form_id: HELP_FORM_ID,
        user_feedback: data.inquiry.trim(),
        user_email: user?.email,
      });
      toast.success(HELP_SUCCESS_MESSAGE);
      form.reset();
      router.back();
    },
    [form, router, user?.email],
  );

  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit, onInvalid)();
  }, [form, onSubmit, onInvalid]);

  return {
    form,
    handleSubmit,
  };
};
