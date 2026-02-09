'use client';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';

import { FEEDBACK_STEPS } from './constants/feedback.constants';
import { useFeedbackForm } from './hooks';
import { FeedbackSection } from './ui/feedback-section';

export const FeedbackScreen = () => {
  const { form, currentStep, isLastStep, goNext, goPrev } = useFeedbackForm();

  return (
    <Form {...form}>
      <FeedbackSection>
        <FeedbackSection.Header
          currentStep={currentStep}
          onPreviousStep={goPrev}
        />
        <FeedbackSection.Content>
          <FeedbackSection.StepInfo currentStep={currentStep} />
          <div className="w-full flex flex-col flex-1">
            {FEEDBACK_STEPS.map((step) => {
              const isCurrentStep = step === currentStep;
              return (
                <FormField
                  key={step}
                  control={form.control}
                  name={step}
                  render={({ field }) => {
                    const error = form.formState.errors[step];
                    return (
                      <FormItem
                        className={`w-full flex flex-col gap-2 ${
                          isCurrentStep ? '' : 'hidden'
                        }`}
                      >
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="자유롭게 적어주세요."
                            rows={4}
                            aria-invalid={!!error}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </div>
        </FeedbackSection.Content>
        <FeedbackSection.Bottom>
          <Button onClick={goNext} type="button">
            {isLastStep ? '제출하기' : '다음'}
          </Button>
        </FeedbackSection.Bottom>
      </FeedbackSection>
    </Form>
  );
};
