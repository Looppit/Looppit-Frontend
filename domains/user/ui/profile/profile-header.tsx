import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';

export function ProfileHeader() {
  const router = useRouter();

  return (
    <DetailHeader
      onLeftClick={() => router.back()}
      leftIcon="ic_arrow_back_ios_new"
      title="프로필 수정"
      leftIconClassName="cursor-pointer"
    />
  );
}
