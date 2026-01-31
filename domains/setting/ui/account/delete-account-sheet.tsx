import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/shared/ui/drawer';

interface DeleteAccountSheetProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteAccountSheet({ open, onClose }: DeleteAccountSheetProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
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
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="destructive" onClick={onClose}>
            회원탈퇴
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
