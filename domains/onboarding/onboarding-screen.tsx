import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { OnboardingStep } from './onboarding.types';
import {
  OnboardingLayout,
  CompletedStep,
  NicknameStep,
  ProfileStep,
} from './ui';

function OnboardingScreen() {
  const form = useForm({
    defaultValues: {
      nickname: '',
      profileImage: '',
    },
  });
  const [step, setStep] = useState<OnboardingStep>('nicknameStep');

  const handleNextStep = () => {
    if (step === 'nicknameStep') {
      setStep('profileImageStep');
    } else if (step === 'profileImageStep') {
      setStep('completedStep');
    }
  };

  return (
    <Form {...form}>
      <OnboardingLayout currentStep={step}>
        {step === 'nicknameStep' && <NicknameStep />}
        {step === 'profileImageStep' && <ProfileStep />}
        {step === 'completedStep' && <CompletedStep />}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 pt-10 z-10">
          <Button onClick={handleNextStep}>
            {step === 'completedStep' ? '완료' : '다음'}
          </Button>
        </div>
      </OnboardingLayout>
    </Form>
  );
}

export { OnboardingScreen };
