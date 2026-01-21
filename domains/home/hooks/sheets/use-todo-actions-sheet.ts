import { useSetAtom, useAtomValue } from 'jotai';

import {
  openTodoActionsSheetAtom,
  closeTodoActionsSheetAtom,
  todoActionsSheetOpenAtom,
  todoActionsSheetTodoAtom,
  todoActionsSheetCategoryIdAtom,
} from '@/domains/home/store/todo-actions-sheet.atom';

export const useTodoActionsSheet = () => {
  const openSheet = useSetAtom(openTodoActionsSheetAtom);
  const closeSheet = useSetAtom(closeTodoActionsSheetAtom);
  const isOpen = useAtomValue(todoActionsSheetOpenAtom);
  const todo = useAtomValue(todoActionsSheetTodoAtom);
  const categoryId = useAtomValue(todoActionsSheetCategoryIdAtom);

  return {
    openSheet,
    closeSheet,
    isOpen,
    todo,
    categoryId,
  };
};
