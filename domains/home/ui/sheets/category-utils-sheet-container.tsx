import { CategoryUtilsSheet } from '@/domains/category/ui';
import {
  SheetComponentProps,
  TodoCategoryUtilsSheetProps,
} from '@/domains/home/types';

export const CategoryUtilsSheetContainer = ({
  props,
  onClose,
}: SheetComponentProps<TodoCategoryUtilsSheetProps>) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <CategoryUtilsSheet
      categoryId={String(props.categoryId)}
      open={true}
      setOpen={handleOpenChange}
    />
  );
};
