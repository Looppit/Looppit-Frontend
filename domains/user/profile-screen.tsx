import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Spacing } from '@/shared/ui/spacing';

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

  const handleUpdateProfile = useCallback(() => {
    updateProfileMutations({
      form: form.getValues(),
      onSuccess: () => {
        toast.success('프로필이 수정되었어요');
      },
    });
  }, [updateProfileMutations, form]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ProfileHeader />
      <Form {...form}>
        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-40 no-scrollbar">
          <ProfileImageField />
          <div className="space-y-6">
            <EmailField email={user?.email ?? ''} />
            <NicknameField />
            <ContentField />
          </div>
          <Spacing size={108} />
          <Button onClick={handleUpdateProfile} disabled={isPending}>
            {isPending ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
