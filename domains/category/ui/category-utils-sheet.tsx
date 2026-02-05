import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDeleteCategory } from '@/domains/category/hooks';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';

type CategoryUtilsSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryId: string;
};

export const CategoryUtilsSheet = ({
  open,
  setOpen,
  categoryId,
}: CategoryUtilsSheetProps) => {
  const router = useRouter();
  const deleteTodoMutation = useDeleteCategory(categoryId);

  const handleDelete = async () => {
    await deleteTodoMutation.mutateAsync();
    router.back();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>카테고리</DrawerTitle>
          <DrawerDescription className="sr-only">
            카테고리 변경 메뉴입니다
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2.5">
          <Button variant="outline" size="body" align="start" asChild>
            <Link href={`/category/${categoryId}/edit`}>
              <Button.OutlineIcon
                icon="ic_edit"
                className="bg-gray-500/15"
                iconClassName="fill-gray-400"
              />
              수정하기
            </Link>
          </Button>
          <Button
            variant="outline"
            size="body"
            align="start"
            onClick={handleDelete}
          >
            <Button.OutlineIcon
              icon="ic_delete"
              className="bg-destructive/10"
              iconClassName="fill-destructive"
            />
            <span className="text-destructive">삭제하기</span>
          </Button>
        </div>
        <DrawerClose>닫기</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
