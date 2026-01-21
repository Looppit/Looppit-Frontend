import { atom } from 'jotai';

import { TodoResponse } from '@/domains/home/types';

export const TODO_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export type TodoFormMode = (typeof TODO_FORM_MODE)[keyof typeof TODO_FORM_MODE];

export type TodoFormSheetProps = {
  mode: TodoFormMode;
  categoryId: number;
  todo?: TodoResponse;
};

export const todoFormSheetOpenAtom = atom<boolean>(false);
export const todoFormSheetModeAtom = atom<TodoFormMode>(TODO_FORM_MODE.CREATE);
export const todoFormSheetCategoryIdAtom = atom<number | null>(null);
export const todoFormSheetEditingTodoAtom = atom<TodoResponse | undefined>(
  undefined,
);

export const openTodoFormSheetAtom = atom(
  null,
  (get, set, { mode, categoryId, todo }: TodoFormSheetProps) => {
    set(todoFormSheetModeAtom, mode);
    set(todoFormSheetCategoryIdAtom, categoryId);
    set(todoFormSheetEditingTodoAtom, todo);
    set(todoFormSheetOpenAtom, true);
  },
);

export const closeTodoFormSheetAtom = atom(null, (get, set) => {
  set(todoFormSheetOpenAtom, false);
  set(todoFormSheetModeAtom, TODO_FORM_MODE.CREATE);
  set(todoFormSheetCategoryIdAtom, null);
  set(todoFormSheetEditingTodoAtom, undefined);
});
