import { useRouter } from 'next/navigation';

import { useGetUser } from '@/domains/user/hooks';

import { UserGreeting } from './user-greeting';

export function ProfileSection() {
  const router = useRouter();
  const { data: user } = useGetUser();

  return (
    <UserGreeting
      name={user?.nickname ?? ''}
      imgPath={user?.imgPath ?? null}
      content={user?.content ?? null}
      onClick={() => router.push('/profile')}
    />
  );
}
