import { useCallback } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { getFormValidationMessage } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { useGetUser, useUpdateProfile } from './hooks';
import {
  EmailField,
  NicknameField,
  ProfileImageField,
  ContentField,
} from './ui/profile';
import { ProfileHeader } from './ui/profile/profile-header';
import { UserProfileFormValues, userProfileFormSchema } from './user.types';

export function ProfileScreen() {
  const { data: user } = useGetUser();
  const { updateProfileMutations, isPending } = useUpdateProfile();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileFormSchema),
    values: {
      nickname: user?.nickname ?? '',
      content: user?.content ?? '',
      imgPath: user?.imgPath ?? null,
    },
    mode: 'onChange',
  });

  const handleSubmit = useCallback(() => {
    updateProfileMutations({
      form: form.getValues(),
      onSuccess: () => {
        toast.success('프로필이 수정되었어요');
      },
    });
  }, [updateProfileMutations, form]);

  const handleError = useCallback(
    (errors: FieldErrors<UserProfileFormValues>) => {
      toast.error(getFormValidationMessage(errors));
    },
    [],
  );

  return (
    <div className="flex flex-col h-full relative">
      <ProfileHeader />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
          <div className="flex-1 overflow-y-auto px-6 pt-10 pb-40">
            <ProfileImageField />
            <div className="space-y-6">
              <EmailField email={user?.email ?? ''} />
              <NicknameField />
              <ContentField />
            </div>
            <div className="fixed inset-x-0 bottom-6 px-6">
              <Button type="submit" disabled={isPending}>
                {isPending ? '저장 중...' : '저장하기'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
