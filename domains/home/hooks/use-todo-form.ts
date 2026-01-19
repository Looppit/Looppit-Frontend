import { useEffect, useState } from 'react';

import { Dayjs } from 'dayjs';

import { useCategories } from '@/domains/category/hooks';
import {
  TODO_FORM_MODE,
  TodoFormMode,
} from '@/domains/home/contexts/todo-form-sheet.context';
import { TodoApiResponse } from '@/domains/home/types/todo.types';
import { getInitialFormValues } from '@/domains/home/utils/todo-form.utils';
import { dayjs } from '@/shared/lib';

import { useCreateTodo, useUpdateTodo } from './use-todo-mutations';

type UseTodoFormProps = {
  mode: TodoFormMode;
  onSuccess?: () => void;
  initialCategoryId?: number | null;
  initialTodo?: TodoApiResponse;
};

const handleMutationSuccess = (reset: () => void, onSuccess?: () => void) => {
  reset();
  onSuccess?.();
};

export const useTodoForm = ({
  mode,
  onSuccess,
  initialCategoryId,
  initialTodo,
}: UseTodoFormProps) => {
  const [originalCategoryId, setOriginalCategoryId] = useState<number | null>(
    null,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [todoText, setTodoText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());

  const { data: categories = [] } = useCategories();
  const yearMonth = dayjs().format('YYYY-MM');
  const createTodoMutation = useCreateTodo(yearMonth);
  const updateTodoMutation = useUpdateTodo(yearMonth);

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const handleCreate = () => {
    if (!todoText.trim() || !selectedCategoryId) return;

    createTodoMutation.mutate(
      {
        categoryId: selectedCategoryId,
        data: {
          title: todoText.trim(),
          date: selectedDate,
        },
      },
      {
        onSuccess: () => handleMutationSuccess(reset, onSuccess),
      },
    );
  };

  const handleUpdate = () => {
    if (!todoText.trim() || !selectedCategoryId) return;
    if (!initialTodo || !originalCategoryId) return;

    updateTodoMutation.mutate(
      {
        categoryId: originalCategoryId,
        todoId: initialTodo.todoId,
        data: {
          title: todoText.trim(),
          date: selectedDate,
          updateCategory: selectedCategoryId,
        },
      },
      {
        onSuccess: () => handleMutationSuccess(reset, onSuccess),
      },
    );
  };

  const handleSubmit = () => {
    if (mode === TODO_FORM_MODE.CREATE) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const reset = () => {
    setTodoText('');
    setSelectedCategoryId(null);
    setSelectedDate(dayjs());
  };

  const isSubmitting =
    mode === TODO_FORM_MODE.CREATE
      ? createTodoMutation.isPending
      : updateTodoMutation.isPending;

  useEffect(() => {
    const newValues = getInitialFormValues({
      initialTodo,
      initialCategoryId,
    });

    setOriginalCategoryId(newValues.originalCategoryId);
    setSelectedCategoryId(newValues.categoryId);

    if (mode === TODO_FORM_MODE.EDIT && initialTodo) {
      setTodoText(newValues.todoText);
      setSelectedDate(newValues.selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, initialCategoryId, initialTodo?.todoId]);

  return {
    todoText,
    setTodoText,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedCategory,
    date: selectedDate,
    setDate: setSelectedDate,
    handleSubmit,
    reset,
    isSubmitting,
  };
};
