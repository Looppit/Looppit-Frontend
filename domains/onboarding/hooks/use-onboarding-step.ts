import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { ONBOARDING_STEPS } from '../onboarding.constants';
import { OnboardingFormValues, OnboardingStep } from '../onboarding.types';
import { useSubmitOnboardingForm } from './use-submit-onboarding-form';

interface UseOnboardingStepProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function useOnboardingStep({ form }: UseOnboardingStepProps) {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('nicknameStep');
  const { submitOnboardingForm } = useSubmitOnboardingForm();

  const moveToNextStep = () => {
    const nextStepIndex = ONBOARDING_STEPS.indexOf(step) + 1;
    const nextStep = ONBOARDING_STEPS[nextStepIndex];
    setStep(nextStep);
  };

  const onNextStep = () => {
    if (step === ONBOARDING_STEPS[0]) {
      moveToNextStep();
      return;
    }
    if (step === ONBOARDING_STEPS[1]) {
      const values = form.getValues();
      submitOnboardingForm(values, () => {
        moveToNextStep();
      });
      return;
    }
    if (step === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1]) {
      router.push('/');
      return;
    }
  };

  const onPreviousStep = () => {
    const previousStepIndex = ONBOARDING_STEPS.indexOf(step) - 1;
    const previousStep = ONBOARDING_STEPS[previousStepIndex];
    setStep(previousStep);
  };

  return { step, onNextStep, onPreviousStep };
}
