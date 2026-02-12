import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

import { SettingCardItem } from '../setting-card-item';
import { SettingHeader } from '../setting-header';
import { DeleteAccountSheetTrigger } from './delete-account-sheet';
import { LogoutSheetTrigger } from './logout-sheet';

export function AccountScreen() {
  const router = useRouter();

  return (
    <div>
      <SettingHeader title="계정 관리" />
      <div className="px-5 pt-6 py-6 flex flex-col gap-4">
        <SettingCardItem
          label="프로필 수정"
          variant="outline"
          onClick={() => router.push('/profile')}
        >
          <SettingCardItem.LeftIcon
            className="bg-primary/10"
            iconClassName="fill-primary"
            icon="ic_edit"
          />
        </SettingCardItem>
        <LogoutSheetTrigger>
          <SettingCardItem label="로그아웃" variant="outline">
            <SettingCardItem.LeftIcon
              className="bg-destructive/10"
              iconClassName="fill-destructive"
              icon="ic_logout"
            />
          </SettingCardItem>
        </LogoutSheetTrigger>
        <DeleteAccountSheetTrigger>
          <Button
            variant="ghost"
            className="typography-caption-medium text-secondary/40 underline underline-offset-4 hover:text-secondary/60 transition-colors py-2 px-4"
          >
            회원탈퇴
          </Button>
        </DeleteAccountSheetTrigger>
      </div>
    </div>
  );
}
