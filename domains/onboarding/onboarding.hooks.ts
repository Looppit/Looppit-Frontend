import { useState } from 'react';

import { ONBOARDING_STEPS } from './onboarding.constants';
import { OnboardingStep } from './onboarding.types';

export function useOnboardingStep() {
  const [step, setStep] = useState<OnboardingStep>('nicknameStep');

  const onNextStep = () => {
    const nextStepIndex = ONBOARDING_STEPS.indexOf(step) + 1;
    const nextStep = ONBOARDING_STEPS[nextStepIndex];
    setStep(nextStep);
  };

  const onPreviousStep = () => {
    const previousStepIndex = ONBOARDING_STEPS.indexOf(step) - 1;
    const previousStep = ONBOARDING_STEPS[previousStepIndex];
    setStep(previousStep);
  };

  return { step, onNextStep, onPreviousStep };
}
