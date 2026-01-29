import { useRouter } from 'next/navigation';

import { useGetUser } from '@/domains/user/hooks';

import { UserGreeting } from './user-greeting';

export function ProfileSection() {
  const router = useRouter();
  const { data: user } = useGetUser();

  return (
    <div>
      <UserGreeting
        name={user?.nickname ?? ''}
        imgPath={user?.imagePath ?? null}
        onClick={() => router.push('/profile')}
      />
    </div>
  );
}
