import type { Dispatch, SetStateAction } from 'react';

import { CATEGORY_ICONS } from '@/domains/category/constants';
import { getIconOptionButtonClassName } from '@/domains/category/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';
import { CategoryIconName } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';

type CategoryUtilsSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedIcon: CategoryIconName;
  onIconChange: (icon: CategoryIconName) => void;
};

export const CategoryIconsSheet = ({
  open,
  setOpen,
  selectedIcon,
  onIconChange,
}: CategoryUtilsSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>아이콘 선택</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-5 gap-3">
            {CATEGORY_ICONS.map((icon) => {
              const isSelected = icon === selectedIcon;

              return (
                <IconButton
                  key={`icon-sheet-${icon}`}
                  icon={icon}
                  size="36"
                  type="button"
                  onClick={() => {
                    onIconChange(icon);
                    setOpen(false);
                  }}
                  className={getIconOptionButtonClassName(isSelected)}
                  iconClassName="fill-current"
                />
              );
            })}
          </div>
        </div>
        <DrawerClose>닫기</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
