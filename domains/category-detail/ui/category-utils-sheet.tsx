import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useDeleteCategory } from '@/domains/category-detail/hooks';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
} from '@/shared/ui/drawer';

type CategoryUtilsSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CategoryUtilsSheet = ({
  open,
  setOpen,
}: CategoryUtilsSheetProps) => {
  const router = useRouter();
  const { id: categoryId } = useParams<{ id: string }>();
  const deleteTodoMutation = useDeleteCategory(categoryId);

  const handleDelete = async () => {
    await deleteTodoMutation.mutateAsync();
    router.back();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>카테고리</DrawerHeader>
          <DrawerDescription className="sr-only">
            카테고리 변경 메뉴입니다
          </DrawerDescription>
          <div className="space-y-2.5">
            <Button variant="outline" size="body" align="start" asChild>
              <Link href={`/category/${categoryId}/edit`}>
                <Button.OutlineIcon
                  icon="ic_edit"
                  bgColor="bg-gray-500/15"
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
                bgColor="bg-destructive/10"
                iconClassName="fill-destructive"
              />
              <span className="text-destructive">삭제하기</span>
            </Button>
          </div>
          <DrawerClose>닫기</DrawerClose>
        </DrawerContent>
      </div>
    </Drawer>
  );
};
