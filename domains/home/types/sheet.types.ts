import { TODO_FORM_MODE } from '@/domains/home/constants';

import { TodoResponse } from './todo.types';

export type TodoFormMode = (typeof TODO_FORM_MODE)[keyof typeof TODO_FORM_MODE];

export type SheetComponentProps<T> = {
  props: T;
  onClose: () => void;
};

export type TodoFormSheetProps =
  | { mode: typeof TODO_FORM_MODE.CREATE; categoryId: number }
  | {
      mode: typeof TODO_FORM_MODE.EDIT;
      todo: TodoResponse;
      categoryId: number;
    };

export type TodoActionsSheetProps = {
  todo: TodoResponse;
  categoryId: number;
};

export type TodoDeleteSheetProps = {
  todo: TodoResponse;
  categoryId: number;
};

export type TodoCategoryUtilsSheetProps = {
  categoryId: number;
};
