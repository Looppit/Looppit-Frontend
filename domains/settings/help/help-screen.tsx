'use client';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';

import { HELP_HINT } from './constants/help.constants';
import { useHelpForm } from './hooks';
import { HelpSection } from './ui/help-section';

export const HelpScreen = () => {
  const { form, handleSubmit } = useHelpForm();

  return (
    <Form {...form}>
      <HelpSection>
        <HelpSection.Header />
        <HelpSection.Content hint={HELP_HINT}>
          <div className="w-full flex flex-col flex-1">
            <FormField
              control={form.control}
              name="inquiry"
              render={({ field }) => {
                const error = form.formState.errors.inquiry;
                return (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="문의 내용을 입력해 주세요."
                        rows={8}
                        aria-invalid={!!error}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
        </HelpSection.Content>
        <HelpSection.Bottom>
          <Button onClick={handleSubmit} type="button">
            제출하기
          </Button>
        </HelpSection.Bottom>
      </HelpSection>
    </Form>
  );
};
