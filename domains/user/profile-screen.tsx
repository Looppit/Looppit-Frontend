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
    <Form {...form}>
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-40 no-scrollbar">
        <ProfileImageField />
        <div className="space-y-6">
          <EmailField email={user?.email ?? ''} />
          <NicknameField />
          <ContentField />
        </div>
      </div>
      <Button className="absolute bottom-0 left-0 w-full p-6 flex justify-center z-30 pointer-events-none">
        저장하기
      </Button>
    </Form>
  );
}
