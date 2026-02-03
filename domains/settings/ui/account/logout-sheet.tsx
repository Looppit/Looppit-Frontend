import { useRouter } from 'next/navigation';

import { StrictPropsWithChildren } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from '@/shared/ui/drawer';
import { removeTokensFromCookies } from '@/shared/utils';

type LogoutSheetTriggerProps = StrictPropsWithChildren<{
  children: React.ReactNode;
}>;

export function LogoutSheetTrigger({ children }: LogoutSheetTriggerProps) {
  const router = useRouter();

  const handleClickLogout = async () => {
    removeTokensFromCookies().then(() => {
      router.push('/');
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <DrawerHeader>
          <DrawerTitle className="typography-title-lg">
            로그아웃 하시겠어요?
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="secondary">취소</Button>
          </DrawerClose>
          <Button variant="default" onClick={handleClickLogout}>
            확인
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
