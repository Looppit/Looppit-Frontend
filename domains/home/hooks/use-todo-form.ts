import { useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';

import { Category } from '@/domains/category/types';
import { TODO_FORM_MODE } from '@/domains/home/constants';
import { useCreateTodo, useUpdateTodo } from '@/domains/home/hooks';
import { todoYearMonthAtom } from '@/domains/home/store';
import {
  TodoFormMode,
  TodoResponse,
  todoFormSchema,
  type TodoFormValues,
} from '@/domains/home/types';
import { getInitialFormValues } from '@/domains/home/utils';
import { getFormValidationMessage } from '@/shared/lib';

type UseTodoFormProps = {
  mode: TodoFormMode;
  onSuccess?: () => void;
  initialCategoryId?: number | null;
  initialTodo?: TodoResponse;
  /** 생성 모드일 때 폼 초기 날짜 (캘린더 선택일 등) */
  initialSelectedDate?: Date;
  enabled?: boolean;
  categories: Category[];
};

export const useTodoForm = ({
  mode,
  onSuccess,
  initialCategoryId,
  initialTodo,
  initialSelectedDate,
  categories,
}: UseTodoFormProps) => {
  const initValues = useMemo(() => {
    const { title, categoryId, date } = getInitialFormValues({
      initialTodo,
      initialCategoryId,
      initialSelectedDate,
    });

    return {
      title,
      categoryId,
      date,
    };
  }, [initialTodo, initialCategoryId, initialSelectedDate]);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    values: initValues,
    mode: 'onChange',
  });

  const resetForm = useCallback(() => {
    form.reset(getInitialFormValues({}));
  }, [form]);

  const yearMonth = useAtomValue(todoYearMonthAtom);
  const createTodoMutation = useCreateTodo(yearMonth);
  const updateTodoMutation = useUpdateTodo(yearMonth);

  const selectedCategoryId = useWatch({
    control: form.control,
    name: 'categoryId',
  });
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const handleMutationSuccess = useCallback(() => {
    resetForm();
    onSuccess?.();
  }, [resetForm, onSuccess]);

  const handleCreate = useCallback(
    (data: TodoFormValues) => {
      if (!data.categoryId) return;

      createTodoMutation.mutate(
        {
          categoryId: data.categoryId,
          data: {
            title: data.title.trim(),
            date: data.date,
          },
        },
        {
          onSuccess: handleMutationSuccess,
        },
      );
    },
    [createTodoMutation, handleMutationSuccess],
  );

  const handleUpdate = useCallback(
    (data: TodoFormValues) => {
      if (!initialTodo || initValues.categoryId == null || !data.categoryId)
        return;

      updateTodoMutation.mutate(
        {
          categoryId: initValues.categoryId,
          todoId: initialTodo.todoId,
          data: {
            title: data.title.trim(),
            date: data.date,
            updateCategory: data.categoryId,
          },
        },
        {
          onSuccess: handleMutationSuccess,
        },
      );
    },
    [
      updateTodoMutation,
      initialTodo,
      initValues.categoryId,
      handleMutationSuccess,
    ],
  );

  const handleSubmit = useCallback(
    (e?: React.BaseSyntheticEvent) => {
      return form.handleSubmit(
        (data) => {
          if (!data.categoryId) return;

          if (mode === TODO_FORM_MODE.CREATE) {
            handleCreate(data);
            return;
          }
          handleUpdate(data);
        },
        (error) => {
          toast.error(getFormValidationMessage(error));
        },
      )(e);
    },
    [form, mode, handleCreate, handleUpdate],
  );

  return {
    form,
    selectedCategory,
    handleSubmit,
    reset: resetForm,
    isSubmitting:
      mode === TODO_FORM_MODE.CREATE
        ? createTodoMutation.isPending
        : updateTodoMutation.isPending,
  };
};
