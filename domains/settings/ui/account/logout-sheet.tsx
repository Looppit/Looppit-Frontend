import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/shared/ui/drawer';
import { removeTokensFromCookies } from '@/shared/utils';

interface LogoutSheetProps {
  open: boolean;
  onClose: () => void;
}

export function LogoutSheet({ open, onClose }: LogoutSheetProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleClickLogout = async () => {
    removeTokensFromCookies().then(() => {
      router.push('/');
      onClose();
    });
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <DrawerHeader>
          <DrawerTitle className="typography-title-lg">
            로그아웃 하시겠어요?
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex-row gap-2">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="default" onClick={handleClickLogout}>
            확인
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
