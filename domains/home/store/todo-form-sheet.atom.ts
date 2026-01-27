import { atom } from 'jotai';

import { TodoResponse } from '@/domains/home/types';

export const TODO_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export type TodoFormMode = (typeof TODO_FORM_MODE)[keyof typeof TODO_FORM_MODE];

export type EditTodoFormSheetProps = {
  todo: TodoResponse;
  categoryId: number;
};

export type TodoFormSheetProps =
  | { mode: typeof TODO_FORM_MODE.CREATE; categoryId: number }
  | ({ mode: typeof TODO_FORM_MODE.EDIT } & EditTodoFormSheetProps);

export const todoFormSheetOpenAtom = atom<boolean>(false);
export const todoFormSheetModeAtom = atom<TodoFormMode>(TODO_FORM_MODE.CREATE);
export const todoFormSheetCategoryIdAtom = atom<number | null>(null);
export const todoFormSheetEditingTodoAtom = atom<TodoResponse | undefined>(
  undefined,
);

export const openTodoFormSheetAtom = atom(
  null,
  (get, set, props: TodoFormSheetProps) => {
    set(todoFormSheetModeAtom, props.mode);
    set(todoFormSheetCategoryIdAtom, props.categoryId);
    set(
      todoFormSheetEditingTodoAtom,
      props.mode === TODO_FORM_MODE.CREATE ? undefined : props.todo,
    );
    set(todoFormSheetOpenAtom, true);
  },
);

export const closeTodoFormSheetAtom = atom(null, (get, set) => {
  set(todoFormSheetOpenAtom, false);
  set(todoFormSheetModeAtom, TODO_FORM_MODE.CREATE);
  set(todoFormSheetCategoryIdAtom, null);
  set(todoFormSheetEditingTodoAtom, undefined);
});
