import { atom } from 'jotai';

import { TodoResponse } from '@/domains/home/types';

export type TodoActionSheetProps = {
  todo: TodoResponse;
  categoryId: number;
};

export const todoActionsSheetOpenAtom = atom<boolean>(false);
export const todoActionsSheetTodoAtom = atom<TodoResponse | null>(null);
export const todoActionsSheetCategoryIdAtom = atom<number | null>(null);

export const openTodoActionsSheetAtom = atom(
  null,
  (get, set, { todo, categoryId }: TodoActionSheetProps) => {
    set(todoActionsSheetTodoAtom, todo);
    set(todoActionsSheetCategoryIdAtom, categoryId);
    set(todoActionsSheetOpenAtom, true);
  },
);

export const closeTodoActionsSheetAtom = atom(null, (get, set) => {
  set(todoActionsSheetOpenAtom, false);
  set(todoActionsSheetTodoAtom, null);
  set(todoActionsSheetCategoryIdAtom, null);
});
