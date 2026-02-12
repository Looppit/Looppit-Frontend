import { useRouter } from 'next/navigation';

import { StrictPropsWithChildren } from '@/shared/types';
import { DetailHeader } from '@/shared/ui/detail-header';

import {
  FEEDBACK_STEPS,
  FEEDBACK_STEPS_INFO,
  type FeedbackStep,
} from '../constants/feedback.constants';

const FeedbackSectionRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex flex-col h-dvh overflow-hidden fixed z-10 w-full max-w-xl bg-background">
      {children}
    </div>
  );
};

interface FeedbackSectionHeaderProps {
  currentStep: FeedbackStep;
  onPreviousStep: () => void;
}

const FeedbackSectionHeader = ({
  currentStep,
  onPreviousStep,
}: FeedbackSectionHeaderProps) => {
  const router = useRouter();
  const isFirstStep = currentStep === FEEDBACK_STEPS[0];

  const handleBack = () => {
    if (isFirstStep) {
      router.back();
      return;
    }
    onPreviousStep();
  };

  return (
    <DetailHeader
      title="앱 개선 제안"
      onLeftClick={handleBack}
      leftIconClassName="cursor-pointer"
    />
  );
};

interface FeedbackSectionStepInfoProps {
  currentStep: FeedbackStep;
}

const FeedbackSectionStepInfo = ({
  currentStep,
}: FeedbackSectionStepInfoProps) => {
  const { step, title, description } = FEEDBACK_STEPS_INFO[currentStep];

  return (
    <div className="w-full mt-6 mb-6">
      <span className="typography-caption-bold text-primary tracking-[0.2em] uppercase mb-4 block">
        STEP {step}
      </span>
      <h2 className="typography-title-medium leading-snug mb-3">{title}</h2>
      {description && (
        <p className="typography-body-semibold text-secondary/60">
          {description}
        </p>
      )}
    </div>
  );
};

const FeedbackSectionContent = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex flex-col px-6 flex-1 overflow-y-auto pb-48">
      {children}
    </div>
  );
};

const FeedbackSectionBottom = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="absolute bottom-0 left-0 w-full px-6 pb-12 pt-10 z-10 bg-background">
      {children}
    </div>
  );
};

const FeedbackSection = Object.assign(FeedbackSectionRoot, {
  Root: FeedbackSectionRoot,
  Header: FeedbackSectionHeader,
  StepInfo: FeedbackSectionStepInfo,
  Content: FeedbackSectionContent,
  Bottom: FeedbackSectionBottom,
});

export { FeedbackSection };
