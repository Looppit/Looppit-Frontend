import { Icon } from '@/shared/ui/icon';

import {
  ONBOARDING_STEPS,
  ONBOARDING_STEPS_INFO,
} from '../onboarding.constants';
import { OnboardingStep } from '../onboarding.types';

interface OnboardingLayoutProps {
  onPreviousStep: () => void;
  currentStep: OnboardingStep;
  children: React.ReactNode;
}

function OnboardingLayout({
  onPreviousStep,
  currentStep,
  children,
}: OnboardingLayoutProps) {
  const isFirstStep = currentStep === ONBOARDING_STEPS[0];
  const isLastStep =
    currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1];

  const handlePreviousStep = () => {
    if (isFirstStep) return;
    onPreviousStep();
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      {!isFirstStep && !isLastStep && (
        <header className="px-5 pt-6 pb-6 flex items-center justify-between bg-background w-full shrink-0">
          <div className="w-10 flex items-center">
            <Icon
              onClick={handlePreviousStep}
              icon="ic_arrow_back_ios_new"
              size="20"
              className="fill-current"
            />
          </div>
          <h1 className="flex-1 text-center text-[16px] font-bold tracking-tight text-white/90"></h1>
          <div className="w-10 flex items-center justify-end"></div>
        </header>
      )}
      <div className="flex flex-col px-6 flex-1 overflow-y-auto pb-48">
        <div className="h-full flex flex-col items-center justify-center flex-1">
          <OnboardingHeader currentStep={currentStep} />
          <div className="w-full flex flex-col flex-1 items-center justify-between">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface OnboardingHeaderProps {
  currentStep: OnboardingStep;
}

function OnboardingHeader({ currentStep }: OnboardingHeaderProps) {
  const { step, title, description } = ONBOARDING_STEPS_INFO[currentStep];

  return (
    <div className="w-full mt-6 mb-12">
      <span className="typography-caption-bold text-primary tracking-[0.2em] uppercase mb-4 block">
        STEP {step}
      </span>
      <h2 className="typography-title-medium leading-snug mb-3">{title}</h2>
      <p className="typography-body-semibold text-secondary/60">
        {description}
      </p>
    </div>
  );
}

export { OnboardingLayout };
