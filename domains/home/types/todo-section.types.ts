import type {
  TodoActionSheetProps,
  TodoDeleteSheetProps,
  TodoFormSheetProps,
} from '@/domains/home/store';

import { CategoryWithTodosResponse } from './todo.types';

export type TodoSectionHandlers = {
  onTodoCheckedChange: (
    categoryId: number,
    todoId: number,
    checked: boolean,
  ) => void;
  onLabelClick: (props: Omit<TodoFormSheetProps, 'mode'>) => void;
  onOpenTodoActions: (props: TodoActionSheetProps) => void;
  onDeleteTodo: (props: TodoDeleteSheetProps) => void;
  onAddClick: (categoryId: number) => void;
  onTitleClick: (categoryId: number) => void;
};

export type TodoSectionHeaderProps = {
  category: CategoryWithTodosResponse;
};

export type TodoSectionListProps = {
  todos: CategoryWithTodosResponse['todo'];
  categoryId: number;
  categoryColor: CategoryWithTodosResponse['categoryColor'];
};

export type TodoSectionItemProps = {
  todo: CategoryWithTodosResponse['todo'][number];
  categoryId: number;
  categoryColor: CategoryWithTodosResponse['categoryColor'];
};

export type TodoActionsProps = {
  onOpenTodoActions: () => void;
  onDeleteTodo: () => void;
};
