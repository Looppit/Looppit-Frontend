'use client';

import { Category } from '@/domains/category/types';
import { Chip } from '@/shared/ui/chip';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';

type CategorySelectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (categoryId: number) => void;
};

export const CategorySelectSheet = ({
  open,
  onOpenChange,
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectSheetProps) => {
  const handleCategoryClick = (categoryId: number) => {
    onSelect(categoryId);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card rounded-t-3xl p-6 z-60 [&+div]:z-60">
        <DrawerHeader>
          <DrawerTitle>카테고리 선택</DrawerTitle>
          <DrawerDescription className="sr-only" />
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const isSelected = category.id === selectedCategoryId;
              return (
                <Chip
                  key={category.id}
                  asChild
                  size="md"
                  themeColor={isSelected ? category.categoryColor : undefined}
                  className="bg-white-softer border-white/8 text-secondary/70"
                  style={{
                    ...(isSelected && {
                      backgroundColor: `${category.categoryColor}20`,
                      borderColor: category.categoryColor,
                      color: category.categoryColor,
                    }),
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="size-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: category.categoryColor }}
                    />
                    <span className="typography-body-bold">
                      {category.categoryName}
                    </span>
                  </button>
                </Chip>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
