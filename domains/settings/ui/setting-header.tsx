import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';
import { cn } from '@/shared/utils';

interface SettingHeaderProps {
  title: string;
  hideBackButton?: boolean;
}

export function SettingHeader({ title, hideBackButton }: SettingHeaderProps) {
  const router = useRouter();

  return (
    <DetailHeader
      onLeftClick={() => router.back()}
      leftIcon="ic_arrow_back_ios_new"
      title={title}
      leftIconClassName={cn(hideBackButton ? 'hidden' : 'cursor-pointer')}
    />
  );
}
