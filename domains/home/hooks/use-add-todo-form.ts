import { useState } from 'react';

import { useCategories } from '@/domains/category/hooks';
import { dayjs } from '@/shared/lib';

import { useCreateTodo } from './use-todos';

const LEVEL = 'NORMAL' as const;

export const useAddTodoForm = (
  onSuccess?: () => void,
  initialCategoryId?: number | null,
) => {
  const [todoText, setTodoText] = useState('');
  const { data: categories = [] } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    () => initialCategoryId ?? null,
  );
  const today = dayjs();
  const createTodoMutation = useCreateTodo(dayjs().format('YYYY-MM'));

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const handleSubmit = () => {
    if (!todoText.trim() || !selectedCategoryId) return;

    createTodoMutation.mutate(
      {
        categoryId: selectedCategoryId,
        data: {
          title: todoText.trim(),
          level: LEVEL,
          date: dayjs(),
          content: '',
        },
      },
      {
        onSuccess: () => {
          setTodoText('');
          setSelectedCategoryId(null);
          onSuccess?.();
        },
      },
    );
  };

  const reset = () => {
    setTodoText('');
    setSelectedCategoryId(null);
  };

  return {
    todoText,
    setTodoText,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedCategory,
    today,
    handleSubmit,
    reset,
    isSubmitting: createTodoMutation.isPending,
  };
};
