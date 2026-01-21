import { useSetAtom, useAtomValue } from 'jotai';

import {
  openTodoFormSheetAtom,
  closeTodoFormSheetAtom,
  todoFormSheetOpenAtom,
  todoFormSheetModeAtom,
  todoFormSheetCategoryIdAtom,
  todoFormSheetEditingTodoAtom,
} from '@/domains/home/store/todo-form-sheet.atom';

export const useTodoFormSheet = () => {
  const openSheet = useSetAtom(openTodoFormSheetAtom);
  const closeSheet = useSetAtom(closeTodoFormSheetAtom);
  const isOpen = useAtomValue(todoFormSheetOpenAtom);
  const mode = useAtomValue(todoFormSheetModeAtom);
  const categoryId = useAtomValue(todoFormSheetCategoryIdAtom);
  const editingTodo = useAtomValue(todoFormSheetEditingTodoAtom);

  return {
    openSheet,
    closeSheet,
    isOpen,
    mode,
    categoryId,
    editingTodo,
  };
};

export {
  TODO_FORM_MODE,
  type TodoFormMode,
} from '@/domains/home/store/todo-form-sheet.atom';
