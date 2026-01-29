import { useGetUser } from '@/domains/user/hooks';

import { UserGreeting } from './user-greeting';

export function ProfileSection() {
  const { data: user } = useGetUser();

  return (
    <UserGreeting
      name={user?.nickname ?? ''}
      imgPath={user?.imagePath ?? null}
    />
  );
}
