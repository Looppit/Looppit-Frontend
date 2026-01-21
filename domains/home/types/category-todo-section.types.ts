import { TodoActionSheetProps } from '@/domains/home/store/todo-actions-sheet.atom';
import { TodoDeleteSheetProps } from '@/domains/home/store/todo-delete-sheet.atom';
import { TodoFormSheetProps } from '@/domains/home/store/todo-form-sheet.atom';

import { CategoryTodoApiResponse } from './todo.types';

export type CategoryTodoSectionHandlers = {
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

export type CategoryTodoSectionHeaderProps = {
  category: CategoryTodoApiResponse;
};

export type CategoryTodoSectionListProps = {
  todos: CategoryTodoApiResponse['todo'];
  categoryId: number;
  categoryColor: CategoryTodoApiResponse['categoryColor'];
};

export type CategoryTodoSectionItemProps = {
  todo: CategoryTodoApiResponse['todo'][number];
  categoryId: number;
  categoryColor: CategoryTodoApiResponse['categoryColor'];
};

export type TodoActionsProps = {
  onOpenTodoActions: () => void;
  onDeleteTodo: () => void;
};
