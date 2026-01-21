import { useSetAtom, useAtomValue } from 'jotai';

import {
  openTodoDeleteSheetAtom,
  closeTodoDeleteSheetAtom,
  todoDeleteSheetOpenAtom,
  todoDeleteSheetCategoryIdAtom,
  todoDeleteSheetTodoAtom,
} from '@/domains/home/store/todo-delete-sheet.atom';

export const useTodoDeleteSheet = () => {
  const openSheet = useSetAtom(openTodoDeleteSheetAtom);
  const closeSheet = useSetAtom(closeTodoDeleteSheetAtom);
  const isOpen = useAtomValue(todoDeleteSheetOpenAtom);
  const todo = useAtomValue(todoDeleteSheetTodoAtom);
  const categoryId = useAtomValue(todoDeleteSheetCategoryIdAtom);

  return {
    openSheet,
    closeSheet,
    isOpen,
    todo,
    categoryId,
  };
};
