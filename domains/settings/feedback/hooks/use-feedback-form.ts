import { useCallback, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useGetUser } from '@/domains/user/hooks/use-user-query';
import { getFormValidationMessage } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/posthog/events';

import {
  FEEDBACK_FORM_ID,
  FEEDBACK_SUCCESS_MESSAGE,
  FEEDBACK_STEPS,
  type FeedbackStep,
} from '../constants/feedback.constants';
import { feedbackFormSchema, FeedbackFormValues } from '../feedback.types';

export const useFeedbackForm = () => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const [currentStep, setCurrentStep] = useState<FeedbackStep>(
    FEEDBACK_STEPS[0],
  );

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      reason: '',
      moment: '',
      neededFeature: '',
      message: '',
    },
  });

  const currentStepIndex = FEEDBACK_STEPS.indexOf(currentStep);
  const isLastStep = currentStepIndex === FEEDBACK_STEPS.length - 1;

  const onInvalid = useCallback((errors: FieldErrors) => {
    toast.error(getFormValidationMessage(errors));
  }, []);

  const onSubmit = useCallback(
    (data: FeedbackFormValues) => {
      trackEvent('custom_form_submitted', {
        form_id: FEEDBACK_FORM_ID,
        answer_1: data.reason?.trim(),
        answer_2: data.moment?.trim(),
        answer_3: data.neededFeature?.trim(),
        user_feedback: data.message?.trim(),
        user_email: user?.email,
      });
      toast.success(FEEDBACK_SUCCESS_MESSAGE);
      form.reset();
      router.back();
    },
    [form, router, user?.email],
  );

  const goNext = useCallback(() => {
    if (isLastStep) {
      form.handleSubmit(onSubmit, onInvalid)();
      return;
    }
    setCurrentStep(FEEDBACK_STEPS[currentStepIndex + 1]);
  }, [isLastStep, form, onSubmit, onInvalid, currentStepIndex]);

  const goPrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(FEEDBACK_STEPS[currentStepIndex - 1]);
    }
  }, [currentStepIndex]);

  return {
    form,
    currentStep,
    isLastStep,
    goNext,
    goPrev,
  };
};
