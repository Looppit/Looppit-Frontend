import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { useGetUser } from './hooks';
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
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileFormSchema),
    values: {
      nickname: user?.nickname ?? '',
      content: user?.content ?? '',
      imgPath: user?.imgPath ?? null,
    },
    mode: 'onChange',
  });

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
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 pt-16 flex justify-center pointer-events-none">
          <Button>저장하기</Button>
        </div>
      </Form>
    </div>
  );
}
