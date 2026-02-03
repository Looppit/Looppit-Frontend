import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';
import { cn } from '@/shared/utils';

interface SettingHeaderProps {
  title: string;
  hideBackButton?: boolean;
  href?: string;
}

export function SettingHeader({
  title,
  hideBackButton,
  href,
}: SettingHeaderProps) {
  const router = useRouter();

  return (
    <DetailHeader
      onLeftClick={() => (href ? router.push(href) : router.back())}
      leftIcon="ic_arrow_back_ios_new"
      title={title}
      leftIconClassName={cn(hideBackButton ? 'hidden' : 'cursor-pointer')}
    />
  );
}
