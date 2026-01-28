import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Category } from '@/domains/category/types';
import { TODO_FORM_MODE } from '@/domains/home/constants';
import { useCreateTodo, useUpdateTodo } from '@/domains/home/hooks';
import {
  TodoFormMode,
  TodoResponse,
  todoFormSchema,
  type TodoFormValues,
} from '@/domains/home/types';
import { getInitialFormValues } from '@/domains/home/utils';
import { dayjs } from '@/shared/lib';

type UseTodoFormProps = {
  mode: TodoFormMode;
  onSuccess?: () => void;
  initialCategoryId?: number | null;
  initialTodo?: TodoResponse;
  enabled?: boolean;
  categories: Category[];
};

const getDefaultFormValues = (): TodoFormValues => ({
  title: '',
  categoryId: null,
  date: dayjs().format('YYYY-MM-DD'),
});

export const useTodoForm = ({
  mode,
  onSuccess,
  initialCategoryId,
  initialTodo,
  categories,
}: UseTodoFormProps) => {
  const originalCategoryIdRef = useRef<number | null>(null);

  const initValues = useMemo(() => {
    const { title, categoryId, date } = getInitialFormValues({
      initialTodo,
      initialCategoryId,
    });

    return {
      title,
      categoryId,
      date,
    };
  }, [initialTodo, initialCategoryId]);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: initValues,
    mode: 'onChange',
  });

  const resetForm = useCallback(() => {
    form.reset(getDefaultFormValues());
    originalCategoryIdRef.current = null;
  }, [form]);

  const yearMonth = dayjs().format('YYYY-MM');
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
      if (!initialTodo || !originalCategoryIdRef.current || !data.categoryId)
        return;

      updateTodoMutation.mutate(
        {
          categoryId: originalCategoryIdRef.current,
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
    [updateTodoMutation, initialTodo, handleMutationSuccess],
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
        (errors) => {
          const firstError = Object.values(errors)[0];
          if (firstError?.message) {
            toast.error(firstError.message);
            return;
          }
          toast.error('입력 정보를 확인해주세요.');
        },
      )(e);
    },
    [form, mode, handleCreate, handleUpdate],
  );

  useEffect(() => {
    originalCategoryIdRef.current = initValues.categoryId;
    form.reset(initValues);
  }, [form, initValues]);

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
