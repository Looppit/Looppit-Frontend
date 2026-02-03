import { useDeleteUser } from '@/domains/user/hooks';
import { StrictPropsWithChildren } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from '@/shared/ui/drawer';

type DeleteAccountSheetTriggerProps = StrictPropsWithChildren<{
  children: React.ReactNode;
}>;

export function DeleteAccountSheetTrigger({
  children,
}: DeleteAccountSheetTriggerProps) {
  const { mutate: deleteUser } = useDeleteUser();

  const handleClickDelete = () => {
    deleteUser(
      { password: 'test' },
      {
        onSuccess: () => {},
      },
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <DrawerHeader>
          <DrawerTitle className="typography-title-lg">
            정말 탈퇴하시겠어요?
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="text-center">
          탈퇴하면 모든 습관과 데이터가 사라지고 되돌릴 수 없어요.
        </DrawerDescription>
        <DrawerFooter className="flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="secondary">취소</Button>
          </DrawerClose>
          <Button variant="destructive" onClick={handleClickDelete}>
            회원탈퇴
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
