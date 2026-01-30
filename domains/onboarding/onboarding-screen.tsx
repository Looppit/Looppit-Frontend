import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { ONBOARDING_STEPS } from './onboarding.constants';
import { useOnboardingStep } from './onboarding.hooks';
import {
  onboardingFormSchema,
  OnboardingFormValues,
  OnboardingStepSchema,
} from './onboarding.types';
import {
  OnboardingLayout,
  CompletedStep,
  NicknameStep,
  ProfileImageStep,
} from './ui';

function OnboardingScreen() {
  const { step, onNextStep, onPreviousStep } = useOnboardingStep();
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      nickname: '',
      profileImage: null,
    },
    mode: 'onChange',
  });
  const watch = useWatch({ control: form.control });
  const buttonDisabled = !OnboardingStepSchema[step].safeParse(watch).success;
  const isLastStep = step === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1];

  return (
    <Form {...form}>
      <OnboardingLayout onPreviousStep={onPreviousStep} currentStep={step}>
        {step === 'nicknameStep' && <NicknameStep />}
        {step === 'profileImageStep' && <ProfileImageStep />}
        {step === 'completedStep' && <CompletedStep />}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 pt-10 z-10">
          <Button onClick={onNextStep} disabled={buttonDisabled}>
            {isLastStep ? '완료' : '다음'}
          </Button>
        </div>
      </OnboardingLayout>
    </Form>
  );
}

export { OnboardingScreen };
